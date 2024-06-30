from rest_framework import serializers
from order.models import Order
from product.models import Product
from users.models import User
from product.serializers import ProductSerializer, Product

'''
class OrderItemSerializer(serializers.ModelSerializer):
    """serializers for the orderItems class"""
    #product = ProductSerializer()
    #product_id
    id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product.id')
   
    class Meta:
        model = OrderItems
        fields = ['id', 'quantity', 'price']
'''

class OrderSerializer(serializers.ModelSerializer):
    """serializers for the order"""

    product_id = serializers.CharField(max_length=100)
    quantity = serializers.CharField(max_length=100, default="1")

    class Meta:
        model = Order
        fields = ['product_id', 'vendor_id', 'quantity', 'id',
                  'order_date', 'order_status', 'paid_status']

        read_only_fields = ['vendor_id', 'id',
                            'order_date', 'order_status', 'paid_status']

    def create(self, validated_data):
        """
        Create and return a new `Order` instance, given the validated data.
        """
        request = self.context.get('request')
        if request is None:
            raise serializers.ValidationError("Request context is not provided")
        
        user = request.user
        product_id = validated_data['product_id']
        quantity = validated_data['quantity']
        product = Product.objects.get(id=product_id)
        vendor_id = product.user.id

        return Order.objects.create(user=user, vendor_id=str(vendor_id), product=product, quantity=quantity)
