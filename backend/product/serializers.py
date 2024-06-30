from rest_framework import serializers
from product.models import Product
from users.models import User

class ProductSerializer(serializers.ModelSerializer):
    """Serializers for the Product class"""
    class Meta:
        model = Product
        fields = ['id', 'user', 'name', 'image',
                  'description', 'price', 'old_price', 'product_status', 'stock_count',
                  'date_added']