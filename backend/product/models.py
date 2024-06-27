from django.db import models
from users.models import User
from decimal import Decimal
#from vendor.models import Vendor
from django.utils.html import mark_safe
from shortuuid.django_fields import ShortUUIDField
from django.core.exceptions import ValidationError
STATUS = (
    ("available", "Available"),
    ("out_of_stock", "Out Of Stock"),
    ("in_production", "In Production"),
)
def user_directory_path(instance, filename):
    """
    This will create a directory for each user
    for them to save all pictures uploaded
    """
    return f'user_{instance.user.id}/{filename}'


# Create your models here.
class Product(models.Model):
    """class for the products object"""
    product_id = ShortUUIDField(primary_key=True, unique=True, blank=True, length=8, alphabet="1234567890")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False, null=False, default='')
    #vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True, related_name="product")
    image = models.ImageField(upload_to=user_directory_path, blank=False, null=True, default="product.jpg")
    description = models.TextField(null=True, blank=False, default='')
    price = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))
    old_price = models.DecimalField(max_digits=12, decimal_places=2,
                                    blank=False, null=True, default=Decimal('2.99'))
    product_status = models.CharField(
        choices=STATUS, max_length=15, default="available")
    stock_count = models.IntegerField(
        max_length=100, default="10", null=True, blank=True)
    quantity = models.FloatField(blank=False, null=False, default=1.0)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Products"

    def product_image(self):
        return mark_safe('<img src="%s" width="50" height="50" />' % (self.image.url))

    def __str__(self):
        """returning string representation of string"""
        return self.name
    
    def clean(self):
        """Custom validation for the image field"""
        if not self.image:
            raise ValidationError('Image field cannot be empty')

    def get_percentage(self):
        """caluculating the percentage off, or something like 30 percent off"""
        if self.old_price > 0:
            return (self.price / self.old_price) * 100
        return 0
    


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