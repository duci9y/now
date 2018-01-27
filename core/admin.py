from django.contrib import admin
from . import models

class EventAdmin(admin.ModelAdmin):
    list_display = ('start_time', 'end_time', 'location', 'host',)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio',)

admin.site.register(models.Event, EventAdmin)
admin.site.register(models.Profile, ProfileAdmin)
