# Generated by Django 3.1.4 on 2021-11-11 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0005_auto_20211105_0703'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='question',
            field=models.TextField(default=''),
        ),
    ]