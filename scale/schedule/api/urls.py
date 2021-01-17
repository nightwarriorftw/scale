from django.urls import include, path
from rest_framework import routers

from .views import ScheduleInterviewDetailAPI, ScheduleInterviewListAPI

app_name = 'schedule'

urlpatterns = [
    path('', ScheduleInterviewListAPI.as_view(), name='interview_list'),
    path('<int:pk>/', ScheduleInterviewDetailAPI.as_view(), name='interview_detail'),
]
