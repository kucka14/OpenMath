# Generated by Django 3.2.9 on 2022-06-07 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0026_alter_resource_group_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='standard',
            name='label',
            field=models.CharField(default='', max_length=100),
        ),
    ]