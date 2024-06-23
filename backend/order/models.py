from django.db import models
from users.models import User
from product.models import Product
from django.utils.html import mark_safe
from shortuuid.django_fields import ShortUUIDField

# Create your models here.
STATUS_CHOICE = (
    ("processing", "Processing"),
    ("shipped", "Shipped"),
    ("delivered", "Delivered"),
    ('cancelled', 'Cancelled'),
)

class Order(models.Model):
    """This is the class that handles the all the Order in a whole"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_id = ShortUUIDField(null=True, blank=True, length=8, max_length=20, alphabet="1234567890")
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    order_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    paid_status = models.BooleanField(default=False)
    order_status = models.CharField(max_length=10, choices=STATUS_CHOICE)

    address = models.CharField(max_length=100, null=False, blank=False)
    city = models.CharField(max_length=100, null=False, blank=False)
    state = models.CharField(max_length=100, null=True, blank=False)
    country = models.CharField(max_length=100, null=False, blank=False)

    created_at = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")

    class Meta:
        verbose_name_plural = "Cart Order"
    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class OrderItems(models.Model):
    """This handles each individual item in the order"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")

    class Meta:
        verbose_name_plural = "Cart Order Items"

    