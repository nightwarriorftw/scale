from django.contrib import admin

from .forms import ScheduleInterviewForm
from .models import ParticipantsModel, ScheduleInterviewModel


class ParticipantsAdmin(admin.ModelAdmin):

    model = ParticipantsModel


class ScheduleInterviewAdmin(admin.ModelAdmin):

    form = ScheduleInterviewForm


admin.site.register(ParticipantsModel, ParticipantsAdmin)
admin.site.register(ScheduleInterviewModel, ScheduleInterviewAdmin)
