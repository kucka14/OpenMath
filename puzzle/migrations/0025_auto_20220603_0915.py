# Generated by Django 3.2.9 on 2022-06-03 13:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0024_resource_length'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='resource',
            name='category',
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]