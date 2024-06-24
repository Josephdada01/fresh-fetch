from django.urls import path, include
from product.views import ProductList, ProductDetail
from rest_framework.routers import DefaultRouter
from product.views import ProductViewSet

urlpatterns = [
    path('api/v1/products/', ProductList.as_view(), name='product-list'),
    path('api/v1/products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
]

# registering the viewset for vendor product creation and updating
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns += [
    path('api/v1/', include(router.urls)),
]

