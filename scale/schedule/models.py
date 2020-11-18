from django.db import models
from django.db.models import Q


class ParticipantsModel(models.Model):
    name = models.CharField(max_length=250)
    email = models.EmailField()

    def __str__(self):
        return self.name


class ScheduleManager(models.Manager):

    def get_availability(self, interview_date, start_time, end_time, participants):
        queryset = ScheduleInterviewModel.objects.filter(Q(interview_date=interview_date) &
                                                         Q(participants__in=participants) &
                                                         ((Q(start_time__lte=start_time) &
                                                           Q(end_time__gte=start_time)) |
                                                          Q(start_time__lte=end_time) &
                                                          Q(end_time__gte=end_time))). values('participants')
        return queryset


class ScheduleInterviewModel(models.Model):
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
