# Generated by Django 3.2.9 on 2021-12-01 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0019_auto_20211201_0433'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='color',
        ),
        migrations.AddField(
            model_name='category',
            name='color_count',
            field=models.IntegerField(default=0),
        ),
    ]