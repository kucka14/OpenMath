# Generated by Django 3.2.9 on 2022-06-07 11:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0027_standard_label'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='standard',
            name='category',
        ),
        migrations.RemoveField(
            model_name='standard',
            name='grade',
        ),
        migrations.RemoveField(
            model_name='standard',
            name='letter',
        ),
        migrations.RemoveField(
            model_name='standard',
            name='number',
        ),
    ]