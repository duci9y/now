from django.conf.urls import include, url
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'api/events', views.EventViewSet, 'event')
router.register(r'api/profiles', views.ProfileViewSet, 'profile')

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^create_event/$', views.create_event, name='create_event'),
    url(r'^profile/$', views.profile, name='profile'),
    url(r'^feed/$', views.feed_global, name='feed'),
    url(r'^me/$', views.feed_personal, name='personal'),
    url(r'^event/(?P<event_id>\w{0,50})/$', views.details, name='event_details'),
    url(r'^', include(router.urls)),
]
