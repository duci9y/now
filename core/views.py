from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import viewsets, mixins, status
from .models import Profile, Event
from .serializers import ProfileSerializer, EventSerializer
from rest_framework import permissions

@login_required
def home(request):
    return render(request, 'core/home.html.j2')

def profile(request):
    return render(request, 'core/profile.html.j2')

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
