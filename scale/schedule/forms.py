from django import forms

from .models import ScheduleInterviewModel


class ScheduleInterviewForm(forms.ModelForm):

    class Meta:
        model = ScheduleInterviewModel
        fields = '__all__'

    def clean(self):
        participants = self.cleaned_data.get('participants')
        if participants and participants.count() < 2:
            raise forms.ValidationError('Minimum 2 participants are allowed')

        return self.cleaned_data
