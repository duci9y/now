from django.dispatch import receiver
from .models import Profile
from django.db.models.signals import post_save
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def create_profile_for_user(sender, **kwargs):
    print(kwargs)
    user = kwargs.get('instance')
    p = None

    try:
        p = Profile.objects.get(user=user)
    except Profile.DoesNotExist as e:
        print('creating profile for user')

    if not p:
        p = Profile(user=user)
        p.save()

    print(p)
