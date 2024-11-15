# Generated by Django 3.1.4 on 2021-11-05 11:03

from django.db import migrations, models
import puzzle.models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0004_resource_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='email',
            field=models.EmailField(default='', max_length=254),
        ),
        migrations.AddField(
            model_name='resource',
            name='image',
            field=models.ImageField(null=True, upload_to=puzzle.models.UploadToPathAndRename('resourceimages/')),
        ),
    ]
