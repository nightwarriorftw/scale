import json

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import ParticipantsModel, ScheduleInterviewModel


class ParticipantsModelTestCase(TestCase):
    """
        This class defines the test suite for the participants model
    """

    def setUp(self):
        """
            define the test participant
        """
        self.name = "test1"
        self.email = "test1@xyz.com"
        self.participant = ParticipantsModel(name=self.name, email=self.email)

    def test_model_can_create_a_participant(self):
        """
            Test participants model to create participants
        """
        old_count = ParticipantsModel.objects.count()
        self.participant.save()
        new_count = ParticipantsModel.objects.count()
        self.assertNotEqual(old_count, new_count)


class ScheduleInterviewModelTestCase(TestCase):
    """
        This class defines test suite for ScheduleInterview Model
    """

    def test_schedule_interview_with_participants(self):
        participant1 = ParticipantsModel.objects.create(
            name='test2', email='test2@xyz.com')
        participant2 = ParticipantsModel.objects.create(
            name='test3', email='test3@xyz.com')

        test_obj = ScheduleInterviewModel.objects.create(
            subject="test subject",
            description="testing scheduled interview model",
            interview_date="2021-01-16",
            start_time="20:32:55",
            end_time="22:12:00",
            status=True
        )

        test_obj.participants.set([participant1.pk, participant2.pk])
        self.assertEqual(test_obj.participants.count(), 2)


class ScheduleInterviewViewTestCase(TestCase):
    """
        This suite is for testing ScheduleInterviewList, ScheduleInterviewDetails APIView
    """

    def setUp(self):
        """
            Define the test client
        """

        self.client = APIClient()
        self.interview_data = {
            "subject": "Interview with Team Deno",
            "description": "asdasdasd",
            "interview_date": "2021-01-16",
            "start_time": "20:01:00",
            "end_time": "23:00:00",
            "participants": [
                {
                    "name": "test3",
                    "email": "test3@xyz.com"
                },
                {
                    "name": "test4",
                    "email": "test4@xyz.com"
                }
            ],
            "status": "true"
        }

        self.response = self.client.post(
            reverse('schedule:interview_list'),
            self.interview_data,
            format="json"
        )

    def test_api_can_schedule_interview(self):
        """
            Test the api has schedule interview capability
        """
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_api_can_get_scheduled_interview(self):
        """
            Test the api has getting scheduled interview capability
        """
        test_schedule = ScheduleInterviewModel.objects.get(id=1)
        response = self.client.get(
            reverse('schedule:interview_detail',
                    kwargs={'pk': test_schedule.id}),
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_can_update_scheduled_interview(self):
        """
            Test the api has updating scheduled interview capability
        """

        self.interview_data['interview_date'] = "2021-01-19"
        test_schedule = ScheduleInterviewModel.objects.get(id=1)

        response = self.client.put(
            reverse('schedule:interview_detail',
                    kwargs={'pk': test_schedule.id}),
            self.interview_data,
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    
    def test_api_can_delete_scheduled_interview(self):
        """
            Test the api has delete the scheduled interview capability
        """

        test_schedule = ScheduleInterviewModel.objects.get(id=1)

        response = self.client.delete(
            reverse("schedule:interview_detail", kwargs={'pk': test_schedule.id}),
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
