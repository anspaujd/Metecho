# Generated by Django 3.0.6 on 2020-05-14 19:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0072_merge_20200423_1445"),
    ]

    operations = [
        migrations.AlterUniqueTogether(name="project", unique_together=set(),),
    ]
