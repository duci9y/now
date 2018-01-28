from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import viewsets, mixins, status
from .models import Profile, Event
from .serializers import ProfileSerializer, EventSerializer
from rest_framework import permissions
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D

@login_required
def home(request):
    q = Event.objects.all()
    context = { 'events': q }
    return render(request, 'core/home.html.j2', context=context)

@login_required
def create_event(request):
	return render(request,'core/create_event.html.j2')

def profile(request):
    return render(request, 'core/profile.html.j2')

def profile(request):
    return render(request, 'core/profile.html.j2')

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        queryset = Event.objects.all()
        lat = self.request.query_params.get('lat', None)
        lng = self.request.query_params.get('lng', None)

        if lat and lng:
            p = Point(float(lat), float(lng))
            queryset = queryset.filter(location__distance_lt=(p, D(km=5)))

        return queryset

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
