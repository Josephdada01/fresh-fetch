# Generated by Django 5.0.3 on 2024-06-30 12:46

import product.models
import uuid
from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Unique ID for product', primary_key=True, serialize=False)),
                ('name', models.CharField(default='', help_text='Input the name of the price', max_length=100)),
                ('image', models.ImageField(default='product.jpg', help_text='Upload the picture of the product', null=True, upload_to=product.models.user_directory_path)),
                ('description', models.TextField(default='', help_text='Write the description for the product', null=True)),
                ('price', models.DecimalField(decimal_places=2, default=Decimal('0.00'), help_text='input the current price for the product', max_digits=12)),
                ('old_price', models.DecimalField(decimal_places=2, default=Decimal('2.99'), help_text='input the old price', max_digits=12, null=True)),
                ('product_status', models.CharField(choices=[('available', 'Available'), ('out_of_stock', 'Out Of Stock'), ('in_production', 'In Production')], default='available', help_text='select the availability of the product', max_length=15)),
                ('stock_count', models.IntegerField(blank=True, default='10', help_text='how many of the product do you have in store?', null=True)),
                ('quantity', models.FloatField(default=1.0, help_text='Input the number of quantity you have in store')),
                ('date_added', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name_plural': 'Products',
            },
        ),
    ]
