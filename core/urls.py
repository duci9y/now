from django.conf.urls import include, url
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'api/events', views.EventViewSet, 'Event')
router.register(r'api/profiles', views.ProfileViewSet, 'Profile')

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^feed/$', views.feed_global, name='feed'),
    url(r'^', include(router.urls)),
]
