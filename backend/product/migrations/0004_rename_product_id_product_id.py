# Generated by Django 5.0.3 on 2024-06-29 10:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_alter_product_description_alter_product_image_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='product_id',
            new_name='id',
        ),
    ]
