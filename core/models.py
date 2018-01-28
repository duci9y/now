from django.contrib.auth.models import User
from django.contrib.gis.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)

class Event(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.PointField(srid=4269)
    description = models.TextField()
    host = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='events')
    guests = models.ManyToManyField(Profile, related_name='interesting_events', blank=True)
