from rest_framework import serializers
from .models import Profile, Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        host = serializers.HiddenField(default=serializers.CurrentUserDefault())
        fields = ('id', 'start_time', 'end_time', 'location', 'description',
                    'host', 'guests', 'location_name',)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('first_name', 'last_name','fbid','id', 'bio', 'events', 'interesting_events',)
