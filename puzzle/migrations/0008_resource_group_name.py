# Generated by Django 3.1.4 on 2021-11-17 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0007_auto_20211116_1354'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='group_name',
            field=models.CharField(default='', max_length=100),
        ),
    ]
