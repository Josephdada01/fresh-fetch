from django.db import models
from users.models import User
from product.models import Product
from decimal import Decimal
from django.utils.html import mark_safe
import uuid
from django.utils import timezone
from shortuuid.django_fields import ShortUUIDField

# Create your models here.
STATUS_CHOICE = (
    ("pending", "Pending"),
    ("enroute", "Enroute"),
    ("completed", "Completed"),
    ('cancelled', 'Cancelled'),
)

class Order(models.Model):
    """This is the class that handles the all the Order in a whole"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='products')
    # order_id = ShortUUIDField(null=True, blank=True, length=8, alphabet="1234567890", unique=True)
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4, help_text="Unique ID for order")
    # price = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))
    order_date = models.DateTimeField(auto_now_add=True)
    # order_date = models.DateTimeField(default=timezone.now) 
    paid_status = models.BooleanField(default=False)
    order_status = models.CharField(max_length=15, choices=STATUS_CHOICE, default="pending")
    vendor_id = models.CharField(max_length=100)
    vendor_name = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100, default='1')
    product_name = models.CharField(max_length=500)
    product_price = models.CharField(max_length=500)
    product_image_url = models.URLField(max_length=500)
    # state = models.CharField(max_length=100, default="Arizona")
    # country = models.CharField(max_length=100)
    # total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    class Meta:
        verbose_name_plural = "Orders"

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

'''
class OrderItems(models.Model):
    """This handles each individual item in the order"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))


    class Meta:
        verbose_name_plural = "Order Items"
    
    def __str__(self):
        return f"{self.quantity} x {self.product.name} for Order {self.order.id}"
'''
    