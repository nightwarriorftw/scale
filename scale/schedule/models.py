from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Q
from django.db.models.signals import m2m_changed


class ParticipantsModel(models.Model):
    name = models.CharField(max_length=250)
    email = models.EmailField()

    def __str__(self):
        return self.name


class ScheduleManager(models.Manager):
    """
        Custom model manager for getting availability for the participants
    """

    def get_availability(self, interview_date, start_time, end_time, participants):
        queryset = ScheduleInterviewModel.objects.filter(Q(interview_date=interview_date) &
                                                         Q(participants__in=participants) &
                                                         ((Q(start_time__lte=start_time) &
                                                           Q(end_time__gte=start_time)) |
                                                          Q(start_time__lte=end_time) &
                                                          Q(end_time__gte=end_time))). values('participants')
        return queryset

    def get_availability_modified(self, schedule_id, interview_date, start_time, end_time, participants):
        queryset = ScheduleInterviewModel.objects.filter((~Q(id=schedule_id)) &
                                                         Q(interview_date=interview_date) &
                                                         Q(participants__in=participants) &
                                                         ((Q(start_time__lte=start_time) &
                                                           Q(end_time__gte=start_time)) |
                                                          Q(start_time__lte=end_time) &
                                                          Q(end_time__gte=end_time))). values('participants')
        return queryset


class ScheduleInterviewModel(models.Model):
    """
        Schedule Interview Model
    """
    subject = models.CharField(max_length=100)
    description = models.TextField(max_length=200)
    interview_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    participants = models.ManyToManyField(
        ParticipantsModel, related_name='participants_list')
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ScheduleManager()

    def __str__(self):
        return self.subject


def participants_count(sender, **kwargs):
    if(kwargs['instance'].participants.count() < 2):
        raise ValidationError('Atleast 2 participants should be allowed')


m2m_changed.connect(participants_count, sender=ScheduleInterviewModel)
