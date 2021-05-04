from django import forms

from tracer.models import requestCollection,patternCategory

class noticePatternForm(forms.ModelForm):
    # your_name = forms.CharField(label='Your name', max_length=100)
    class Meta:
        model = requestCollection
        fields = ['name', 'email', 'source', 'category_type', 'image', 'desc']

