from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from product.models import Product
from product.serializers import ProductSerializer
from users.models import User
from product.permissions import IsVendor
#from reviews.permissions import IsUser
"""
class isVendor(IsAuthenticated):
    
    Custom permission to allow only vendors to create, update, and delete products.
    
    def has_permission(self, request, view):
        function that handle the permission
        return super().has_permission(request, view) and request.user.is_vendor
"""

# Create your views here.
class ProductList(generics.ListAPIView):
    """listing the views to all users"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    """listing the product details"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'


class ProductCreateView(generics.CreateAPIView):
    
    # views for creating a product, and restricting the access
    # to only authenticated user and vendors
    
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsVendor]

class ProductUpdateView(generics.UpdateAPIView):
    
    # views for updatingting a product, and restricting the access
    # to only authenticated user and vendors
    
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsVendor]
    lookup_field = 'pk'

class ProductDeleteView(generics.DestroyAPIView):
    
    # views for deleting a product, and restricting the access
    # to only authenticated user and vendors
    
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsVendor]
    lookup_field = 'pk'

############################################## DO NOT DELETE ##################################
# this will work if we want to handle the  CRUD all at once
"""
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsUser]
    lookup_field = 'product_id'

    def perform_create(self, serializer):
        #vendor can perform the creation
        serializer.save(user=self.request.user.is_vendor)

    def perform_update(self, serializer):
        #vendor can perform the update
        serializer.save(user=self.request.user.is_vendor)
"""
