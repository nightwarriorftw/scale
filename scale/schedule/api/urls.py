from rest_framework import routers
from django.urls import path, include
from .views import (
    ScheduleInterviewListAPI,
    ScheduleInterviewDetailAPI,
)


app_name = 'schedule'

urlpatterns = [
    path('', ScheduleInterviewListAPI.as_view(), name='interview_list'),
    path('<int:pk>/', ScheduleInterviewDetailAPI.as_view(), name='interview_detail'),
]
