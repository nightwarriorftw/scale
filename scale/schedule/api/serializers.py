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
