# Generated by Django 3.1.4 on 2021-11-16 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0006_resource_question'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='grade_high',
            field=models.IntegerField(default=12),
        ),
        migrations.AddField(
            model_name='resource',
            name='grade_low',
            field=models.IntegerField(default=0),
        ),
    ]
