import datetime

from django.conf import settings
from django.template import Context
from django.core.mail import EmailMessage
from django.contrib.auth.models import User
from django.template.loader import get_template

from schedule.models import ScheduleInterviewModel

from celery.task.schedules import crontab
from celery.utils.log import get_task_logger
from celery.decorators import periodic_task, task

logger = get_task_logger(__name__)


@task(name='schedule.tasks.scheduled_interview_email')
def scheduled_interview_email(schedule_id, status):
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
    html_template = get_template('cancelled_interview.html')
    receivers = obj.get('receivers_list')

    for participant in receivers:
        content_to_template = {'receiver_name': participant.get('name'),
                               'interview_date': obj.get('interview_date'), 'start_time': obj.get('start_time'), 'end_time': obj.get('end_time')}
        html_content = html_template.render(content_to_template)
        email_subject = status + " " + obj.get('subject')
        send_email = EmailMessage(
            email_subject, html_content, settings.EMAIL_HOST_USER, [participant.get('receiver_email')])
        send_email.content_subtype = "html"
        send_email.send()


@periodic_task(run_every=(crontab(minute='*/15')),
               name='send_reminder_email',
               ignore_result='false'
               )
def send_reminder_email():
    """
    Send reminder email for scheduled interview
    """
    queryset = ScheduleInterviewModel.objects.filter(
        interview_date=datetime.date.today()).first()
    print(queryset)

    # send reminder emails

    logger.info("Reminder email send")
