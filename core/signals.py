from django.dispatch import receiver
from .models import Profile
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from social_django.models import UserSocialAuth

@receiver(post_save, sender=User)
def create_profile_for_user(sender, **kwargs):
    user = kwargs.get('instance')
    p = None

    try:
        p = Profile.objects.get(user=user)
    except Profile.DoesNotExist as e:
        print('creating profile for user')

    if not p:
        p = Profile(user=user)

    try:
        social = UserSocialAuth.objects.get(user=user)
        p.first_name = social.extra_data['first_name']
        p.last_name = social.extra_data['last_name']
        p.fbid = social.uid
    except UserSocialAuth.DoesNotExist as e:
        pass

    p.save()

    print(p)
