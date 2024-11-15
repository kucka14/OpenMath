from django.db import models
from django.utils.deconstruct import deconstructible
from django.dispatch import receiver
from uuid import uuid4
import os

# Create your models here.

@deconstructible
class UploadToPathAndRename(object):

    def __init__(self, path):
        self.sub_path = path

    def __call__(self, instance, filename):
        last_dot = filename.rfind('.')
        filename = uuid4().hex + filename[last_dot:]
        tab = instance.tab
        if tab is None:
            tab_id = 'n1'
        else:
            tab_id = str(tab.id)
        return os.path.join(self.sub_path, tab_id, filename)

class Tab(models.Model):
    index = models.IntegerField(default=1)
    name = models.CharField(max_length=100, default='')
    hidden = models.BooleanField(default=False)
    in_trash = models.BooleanField(default=False)

class Resource(models.Model):
    tab = models.ForeignKey(Tab, on_delete=models.DO_NOTHING, null=True)
    name = models.CharField(max_length=150, default='')
    description = models.TextField(default='')
    question = models.TextField(default='')
    image = models.ImageField(upload_to=UploadToPathAndRename('resourceimages/'), null=True)
    link = models.CharField(max_length=2048, default='')
    email = models.EmailField(max_length=254, default='')
    grade_low = models.IntegerField(default=0)
    grade_high = models.IntegerField(default=12)
    group_name = models.CharField(max_length=150, default='')
    length = models.IntegerField(default=2)
    hidden = models.BooleanField(default=False)
    in_trash = models.BooleanField(default=False)

    def save(self, *args, **kwargs):

        super(Resource, self).save(*args, **kwargs)

        tab = self.tab
        grade_low = int(self.grade_low)
        grade_high = int(self.grade_high)
        length = int(self.length)
        standards_list = [standard.label for standard in self.standard_set.all()]

        group_name = self.group_name
        if group_name == '':
            group_name = self.name
            group_name = group_name.split('#')[0]
            group_name = group_name.strip()
            group_name = group_name.replace(' ', '_')
            group_name = group_name.lower()
            self.group_name = group_name

        group_list = Resource.objects.filter(group_name=group_name, in_trash=False)
        for resource in group_list:
            if resource.id != self.id:
                resource.tab = tab
                resource.grade_low = grade_low
                resource.grade_high = grade_high
                resource.length = length
                existing_standard_list = []

                existing_standard_list = []
                for standard in standards_list:
                    standard_query = Standard.objects.filter(label=standard)
                    if len(standard_query) == 1:
                        existing_standard = standard_query[0]
                        existing_standard_list.append(existing_standard)
                        if resource not in existing_standard.resources.all():
                            existing_standard.resources.add(resource)
                            existing_standard.save()
                for standard in resource.standard_set.all():
                    if standard not in existing_standard_list:
                        standard.resources.remove(resource)

                super(Resource, resource).save(*args, **kwargs)

@receiver(models.signals.post_delete, sender=Resource)
def remove_file_from_s3(sender, instance, using, **kwargs):
    instance.image.delete(save=False)

class Standard(models.Model):
    resources = models.ManyToManyField(Resource)
    label = models.CharField(max_length=100, default='')
    description = models.TextField(default='')

class Tag(models.Model):
    resources = models.ManyToManyField(Resource)
    name = models.CharField(max_length=100, default='')

class SaveList(models.Model):
    tablist = models.TextField(default='[]')
    fulllist = models.TextField(default='[]')
    full_couplet_list = models.TextField(default='[]')
