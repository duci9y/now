from django.conf.urls import include, url
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'api/events', views.EventViewSet, 'event')
router.register(r'api/profiles', views.ProfileViewSet, 'profile')

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^create_event/$', views.create_event, name='create_event'),
    url(r'^', include(router.urls)),
]
