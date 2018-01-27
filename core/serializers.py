from rest_framework import serializers
from .models import Profile, Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('start_time', 'end_time', 'location', 'description',
                    'host', 'guests',)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('bio', 'events', 'interesting_events',)