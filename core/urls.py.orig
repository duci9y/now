from django.conf.urls import include, url
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'api/events', views.EventViewSet, 'event')
router.register(r'api/profiles', views.ProfileViewSet, 'profile')

urlpatterns = [
    url(r'^$', views.home, name='home'),
<<<<<<< HEAD
=======
    url(r'^create_event/$', views.create_event, name='create_event'),
>>>>>>> dcbc1f4ba270a49a715696b469853c29ad57d7d9
    url(r'^profile/$', views.profile, name='profile'),
    url(r'^', include(router.urls)),
]
