# Generated by Django 3.2.9 on 2022-06-03 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0022_tag'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='color_count',
        ),
        migrations.AddField(
            model_name='category',
            name='color',
            field=models.CharField(default='black', max_length=100),
        ),
    ]