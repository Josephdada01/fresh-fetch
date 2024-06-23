from django.db import models
from users.models import User
#from vendor.models import Vendor
from django.utils.html import mark_safe
from shortuuid.django_fields import ShortUUIDField
STATUS = (
    ("available", "Available"),
    ("out_of_stock", "Out Of Stock"),
    ("in_production", "In Production"),
)
# Create your models here.
class Product(models.Model):
    """class for the products object"""
    product_id = ShortUUIDField(null=True, blank=True, length=8, max_length=15, alphabet="1234567890")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default="groceries")
    #vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True, related_name="product")
    #image = models.ImageField(upload_to=user_directory_path, default="product.jpg")
    description = models.TextField(null=True, blank=True, default="This is the product")
    price = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")
    old_price = models.DecimalField(
        max_digits=12, decimal_places=2, default="2.99")
    product_status = models.CharField(
        choices=STATUS, max_length=15, default="available")
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Products"

    def product_image(self):
        return mark_safe('<img src="%s" width="50" height="50" />' % (self.image.url))

    def __str__(self):
        return self.name

    def get_precentage(self):
        new_price = (self.price / self.old_price) * 100
        return new_price
# if we think there is a need to have more than one image for a products then
# this will be helpfull
"""
class ProductImages(models.Model):
    images = models.ImageField(
        upload_to="product-images", default="product.jpg")
    product = models.ForeignKey(
        Product, related_name="p_images", on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Product Images"
"""