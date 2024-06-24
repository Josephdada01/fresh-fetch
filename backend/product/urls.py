from django.urls import path
from product.views import ProductList, ProductDetail

urlpatterns = [
    path('api/v1/products/', ProductList.as_view(), name='product-list'),
    path('api/v1/products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
]