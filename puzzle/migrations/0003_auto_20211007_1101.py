# Generated by Django 3.1.4 on 2021-10-07 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0002_auto_20211006_1618'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='in_trash',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='tab',
            name='in_trash',
            field=models.BooleanField(default=False),
        ),
    ]
