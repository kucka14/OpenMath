# Generated by Django 3.2.9 on 2022-06-03 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0025_auto_20220603_0915'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='group_name',
            field=models.CharField(default='', max_length=100),
        ),
    ]