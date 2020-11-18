from rest_framework import serializers

from schedule.models import ScheduleInterviewModel, ParticipantsModel


class ParticipantsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParticipantsModel
        fields = ('name', 'email')


class ScheduleInterviewSerializer(serializers.ModelSerializer):
    participants = ParticipantsSerializer(
        many=True, read_only=False, required=True)

    class Meta:
        model = ScheduleInterviewModel
        fields = ('subject', 'description', 'interview_date', 'start_time',
                  'end_time', 'participants', 'status', 'created_at', 'updated_at')

    def create(self, validated_data):
        participants = validated_data.pop('participants')

        # if number of participants is less than 2, then return validation error
        if(len(participants) < 2):
            raise serializers.ValidationError(
                'Atleast 2 participants required')

        # create new participants from given list of participants
        participants_list = []
        participants_id = []
        for p in participants:
            name = p.pop('name')
            email = p.pop('email')
            obj, created = ParticipantsModel.objects.get_or_create(
                name=name, email=email)
            participants_id.append(obj.__class__.objects.filter(
                name=name, email=email).values('id')[0]['id'])
            participants_list.append(obj)

        interview_date = validated_data.get('interview_date')
        start_time = validated_data.get('start_time')
        end_time = validated_data.get('end_time')

        queryset = ScheduleInterviewModel.objects.get_availability(
            interview_date, start_time, end_time, participants_id)

        # If participants has already interview scheduled during this time slot, return validation error
        if queryset.exists():
            raise serializers.ValidationError(
                'Some Participants has already an interview scheduled during this time slot')

        schedule = ScheduleInterviewModel.objects.create(**validated_data)
        schedule.participants.set(participants_list)
        return schedule

    def update(self, instance, validated_data):
        obj = self.instance
        participants = validated_data.get('participants')

        # If participants is less that 2, throw validation error
        if len(participants) < 2:
            raise serializers.ValidationError(
                'Alteast 2 participants are required')

        participants_list = []
        participants_id = []

        for p in participants:
            name = p.get('name')
            email = p.get('email')
            p_obj, created = ParticipantsModel.objects.get_or_create(
                name=name, email=email)
            participants_id.append(p_obj.__class__.objects.filter(
                name=name, email=email).values('id')[0]['id'])
            participants_list.append(p_obj)

        interview_date = validated_data.get('interview_date')
        start_time = validated_data.get('start_time')
        end_time = validated_data.get('end_time')

        queryset = ScheduleInterviewModel.objects.get_availability(
            interview_date, start_time, end_time, participants_id)

        # If interview is already scheduled during this time slot, throw error
        if queryset.exists():
            raise serializers.ValidationError(
                'Some participants have meeting already scheduled during this time slot')

        obj.subject = validated_data.get('subject')
        obj.description = validated_data.get('description')
        obj.interview_date = interview_date
        obj.start_time = start_time
        obj.end_time = end_time
        obj.status = validated_data.get('status')

        obj.participants.set(participants_list)
        obj.save()
        return obj
