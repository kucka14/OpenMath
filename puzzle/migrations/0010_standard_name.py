# Generated by Django 3.1.4 on 2021-11-17 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0009_standard'),
    ]

    operations = [
        migrations.AddField(
            model_name='standard',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
    ]
