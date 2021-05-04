# Generated by Django 3.1.6 on 2021-04-09 10:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracer', '0002_auto_20210223_0148'),
    ]

    operations = [
        migrations.CreateModel(
            name='requestCollection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_no', models.IntegerField()),
                ('name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('source', models.CharField(max_length=255)),
                ('category_type', models.CharField(max_length=20)),
                ('image', models.ImageField(upload_to='images')),
                ('desc', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Request Collection',
            },
        ),
    ]
