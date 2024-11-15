from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.dispatch import receiver
import json
import random
from django.db import IntegrityError

def make_classcode(length):
    chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'V', 'W', 'X', 'Y', '3', '4', '6', '7', '8', '9']
    classcode_list = []
    for i in range(length):
        classcode_list.append(random.choice(chars))
    classcode = ''.join(classcode_list)
    return classcode

# Create your models here.

class Profile(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cased_username = models.CharField(max_length=150, null=True)
    display_name = models.CharField(max_length=150, null=True)
    teacher_display_name = models.CharField(max_length=150, null=True)
    picture_password = models.CharField(max_length=100, null=True, unique=True)
    usertype = models.CharField(max_length=10, null=True)
    progress_dict = models.TextField(default='{}')
    is_new_user = models.BooleanField(default=True)
    override_list = models.TextField(default='[]')

class Classroom(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)
    users = models.ManyToManyField(User)
    owners = models.TextField(default='[]')
    name = models.CharField(max_length=100, default='Untitled Classroom')
    classcode = models.CharField(max_length=20, unique=True, null=True)
    in_trash = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.pk:
            super(Classroom, self).save(*args, **kwargs)
        else:
            while True:
                try:
                    self.classcode = make_classcode(6)
                    super(Classroom, self).save(*args, **kwargs)
                    break
                except IntegrityError:
                    pass

    def change_classcode(self):
        while True:
            try:
                classcode = make_classcode(6)
                self.classcode = classcode
                self.save()
                break
            except IntegrityError:
                pass
        return classcode
