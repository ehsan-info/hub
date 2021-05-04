# Generated by Django 3.1.6 on 2021-04-09 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracer', '0008_requestcollection_category_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requestcollection',
            name='category_type',
            field=models.TextField(choices=[('Trick Question', 'Trick Question'), ('Sneak into Basket', 'Sneak into Basket'), ('Forced Continuity', 'Forced Continuity'), ('Misdirection', 'Misdirection'), ('Price Comparison Prevention', 'Price Comparison Prevention'), ('Force Cookies', 'Force Cookies'), ('Urgency', 'Urgency'), ('Confirmshaming', 'Confirmshaming'), ('Hidden costs', 'Hidden costs')]),
        ),
        migrations.AlterField(
            model_name='requestcollection',
            name='source',
            field=models.TextField(),
        ),
    ]
