# Generated by Django 3.1.4 on 2021-11-22 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0012_auto_20211122_0701'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='group_name',
            field=models.CharField(default='zzzzz', max_length=100),
        ),
    ]