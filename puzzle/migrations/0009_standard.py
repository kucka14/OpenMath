# Generated by Django 3.1.4 on 2021-11-17 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0008_resource_group_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Standard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resources', models.ManyToManyField(to='puzzle.Resource')),
            ],
        ),
    ]
