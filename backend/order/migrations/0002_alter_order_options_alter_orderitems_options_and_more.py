# Generated by Django 5.0.3 on 2024-06-24 11:24

import django.db.models.deletion
import django.utils.timezone
import shortuuid.django_fields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order',
            options={'verbose_name_plural': 'Orders'},
        ),
        migrations.AlterModelOptions(
            name='orderitems',
            options={'verbose_name_plural': 'Order Items'},
        ),
        migrations.RemoveField(
            model_name='order',
            name='created_at',
        ),
        migrations.AlterField(
            model_name='order',
            name='address',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_id',
            field=shortuuid.django_fields.ShortUUIDField(alphabet='1234567890', blank=True, length=8, max_length=8, null=True, prefix='', unique=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_status',
            field=models.CharField(choices=[('processing', 'Processing'), ('shipped', 'Shipped'), ('delivered', 'Delivered'), ('cancelled', 'Cancelled')], default='processing', max_length=15),
        ),
        migrations.AlterField(
            model_name='order',
            name='state',
            field=models.CharField(default='Arizona', max_length=100),
        ),
        migrations.AlterField(
            model_name='order',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12),
        ),
        migrations.AlterField(
            model_name='order',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='orderitems',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=12),
        ),
    ]
