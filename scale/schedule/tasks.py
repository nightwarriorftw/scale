import datetime

import pytz
from celery.decorators import periodic_task, task
from celery.task.schedules import crontab
from celery.utils.log import get_task_logger
from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import EmailMessage, get_connection
from django.template import Context
from django.template.loader import get_template

from schedule.models import ScheduleInterviewModel

logger = get_task_logger(__name__)


@task(name='schedule.tasks.scheduled_interview_email')
def scheduled_interview_email(schedule_id, status):
    """
        Send invitation email on creation and updation of the scheduled email
    """
    obj = ScheduleInterviewModel.objects.get(pk=schedule_id)
    html_template = get_template('schedule_interview.html')
    receivers = obj.participants.all()

    # Send invitation emails to participants
    for participant in receivers:
        logger.info("email send to "+participant.name)
        content_to_template = {'receiver_name': participant.name,
                               'interview_date': obj.interview_date, 'start_time': obj.start_time, 'end_time': obj.end_time}
        html_content = html_template.render(content_to_template)
        email_subject = status + " " + obj.subject
        send_email = EmailMessage(
            email_subject, html_content, settings.EMAIL_HOST_USER, [participant.email])
        send_email.content_subtype = "html"
        send_email.send()


@task(name='schedule.tasks.cancelled_interview_email')
def cancelled_interview_email(obj, status):
    """
        Send email for cancelled interview
    """
    html_template = get_template('cancelled_interview.html')
    receivers = obj.get('receivers')

    content_to_template = {'receiver_name': 'Candidate',
                           'interview_date': obj['interview_date'], 'start_time': obj.get('start_time'), 'end_time': obj.get('end_time')}
    html_content = html_template.render(content_to_template)
    email_subject = status + " " + obj.get('subject')
    send_email = EmailMessage(
        email_subject, html_content, settings.EMAIL_HOST_USER, receivers)
    send_email.content_subtype = "html"
    send_email.send()


def send_reminder_email_utils(subject, interview_date, start_time, end_time, emails):
    """
        Sends email to the user
    """
    html_template = get_template('reminder_email.html')
    content_to_template = {'interview_date': interview_date,
                           'start_time': start_time, 'end_time': end_time}
    html_content = html_template.render(content_to_template)
    email_subject = "Reminder " + subject
    send_email = EmailMessage(
        email_subject, html_content, settings.EMAIL_HOST_USER, emails)
    send_email.content_subtype = "html"
    send_email.send()


@periodic_task(run_every=(crontab(minute='*')),
               name='send_reminder_email',
               ignore_result='false'
               )
def send_reminder_email():
    """
    Send reminder email for scheduled interview
    """
    IST = pytz.timezone('Asia/Katmandu')
    reminder_start_time = (datetime.datetime.now(IST) +
                           datetime.timedelta(minutes=15)).strftime('%H:%M:%S')

    reminder_end_time = (datetime.datetime.now(IST) +
                         datetime.timedelta(minutes=16)).strftime('%H:%M:%S')

    current_date = datetime.datetime.now(IST).strftime('%Y-%m-%d')

    logger.info(reminder_start_time)
    logger.info(reminder_end_time)
    logger.info(current_date)

    queryset = ScheduleInterviewModel.objects.filter(
        interview_date=current_date, start_time__gte=reminder_start_time, start_time__lte=reminder_end_time)

    if queryset.exists():
        for obj in queryset:
            email_list = []
            email_queryset = obj.participants.all().values('email')
            for emails in email_queryset:
                email_list.append(emails['email'])

            # Send emails
            send_reminder_email_utils(
                obj.subject, obj.interview_date, obj.start_time, obj.end_time, email_list)
            logger.info('reminder send')

    logger.info("No scheduled interview found")
