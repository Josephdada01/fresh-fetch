from rest_framework import serializers
from order.models import Order, OrderItem
from product.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    """serializers for the orderItems class"""
    product = ProductSerializer()
   
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price' ]

class OrderSerializer(serializers.ModelSerializer):
    """serializers for the order"""
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = fields = ['user', 'order_id', 'items' 'price', 'order_date',
                           'paid_status', 'order_status', 'address', 'city',
                           'state', 'country', 'created_at', 'total']

