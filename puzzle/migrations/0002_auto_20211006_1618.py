# Generated by Django 3.1.4 on 2021-10-06 20:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='TabCategory',
            new_name='Tab',
        ),
        migrations.RenameField(
            model_name='resource',
            old_name='tabcategory',
            new_name='tab',
        ),
        migrations.AlterField(
            model_name='resource',
            name='link',
            field=models.CharField(default='', max_length=2048),
        ),
    ]
