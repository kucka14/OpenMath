# Generated by Django 3.1.4 on 2021-11-17 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0010_standard_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='standard',
            old_name='name',
            new_name='category',
        ),
        migrations.AddField(
            model_name='standard',
            name='grade',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='standard',
            name='letter',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='standard',
            name='number',
            field=models.CharField(default='', max_length=100),
        ),
    ]
