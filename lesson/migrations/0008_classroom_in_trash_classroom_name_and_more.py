# Generated by Django 4.0.5 on 2022-08-09 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lesson', '0007_alter_profile_progress_dict'),
    ]

    operations = [
        migrations.AddField(
            model_name='classroom',
            name='in_trash',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='classroom',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='progress_dict',
            field=models.TextField(default='{}'),
        ),
    ]