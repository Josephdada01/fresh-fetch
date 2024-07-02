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
                  'order_date', 'order_status', 'paid_status',
                  'vendor_name', 'product_name', 'product_price', 
                  'product_image_url']

        read_only_fields = ['vendor_id', 'id', 'product_image',
                            'order_date', 'vendor_name', 'product_image_url',
                            'product_name', 'product_price']

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
        first_name = product.user.first_name
        last_name = product.user.last_name
        vendor_name = f"{first_name} {last_name}"
        product_name = product.name
        product_price = product.price
        product_image = request.build_absolute_uri(product.image.url)

        return Order.objects.create(
                user=user, 
                vendor_id=str(vendor_id), 
                product=product, 
                product_name=product_name, 
                product_price=product_price, 
                product_image_url=product_image, 
                vendor_name=vendor_name, 
                quantity=quantity
            )
