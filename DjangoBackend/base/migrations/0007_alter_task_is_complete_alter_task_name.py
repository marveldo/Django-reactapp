# Generated by Django 4.1.4 on 2024-01-04 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_task_is_complete'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='is_complete',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='name',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]