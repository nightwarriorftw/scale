from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from schedule.tasks import scheduled_interview_email
from schedule.models import ScheduleInterviewModel

from .serializers import ScheduleInterviewSerializer


class ScheduleInterviewListAPI(APIView):
    permission_classes = ()
    authentication_classes = ()

    def get(self, request, format=None):
        snippet = ScheduleInterviewModel.objects.all().order_by('interview_date')
        serializer = ScheduleInterviewSerializer(snippet, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = ScheduleInterviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        schedule_id = serializer.data.get('id')
        scheduled_interview_email.delay(schedule_id, "")
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ScheduleInterviewDetailAPI(APIView):

    def get_object(self, pk):
        return get_object_or_404(ScheduleInterviewModel, pk=pk)

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ScheduleInterviewSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk=pk)
        serializer = ScheduleInterviewSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            scheduled_interview_email.delay(pk, "Update")
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk=pk)
        emails = snippet.participants.values('email')
        email_list = []

        for email in emails:
            email_list.append(email.get('email'))

        details = {
            "receivers": email_list,
            "interview_date": snippet.interview_date,
            "start_time": snippet.start_time,
            "end_time": snippet.end_time,
            "subject": snippet.subject,
        }

        # tasks.cancelled_interview_email.delay(details, "Cancelled")
        snippet.delete()
        return Response("Interview cancelled", status=status.HTTP_204_NO_CONTENT)
