from rest_framework import serializers
from .models import patterns,patternCategory


class patternSerializer(serializers.ModelSerializer):
    class Meta:
        model = patterns
        # fields=( 'ptn_id' , 'patternField' )
        # fields = '__all__'
        fields = ['patternField']


class categorySerializer(serializers.ModelSerializer):
    class Meta:
        model = patternCategory
        # fields=( 'ptn_id' , 'patternField' )
        # fields = '__all__'
        fields = ['category']