# Generated by Django 3.2.9 on 2022-06-14 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0029_savelist'),
    ]

    operations = [
        migrations.AddField(
            model_name='savelist',
            name='full_couplet_list',
            field=models.TextField(default='[]'),
        ),
    ]
