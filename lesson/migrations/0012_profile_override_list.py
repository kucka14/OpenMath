# Generated by Django 3.2.9 on 2022-09-12 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lesson', '0011_classroom_owners'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='override_list',
            field=models.TextField(default='[]'),
        ),
    ]
