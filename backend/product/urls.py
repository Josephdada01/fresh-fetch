from django.urls import path, include
from product.views import ProductList, ProductDetail # ProductCreateView, ProductUpdateView, ProductDeleteView
from rest_framework.routers import DefaultRouter
from product.views import ProductViewSet

urlpatterns = [
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<str:product_id>/', ProductDetail.as_view(), name='product-detail'),
    #path('products/create/', ProductCreateView.as_view(), name='product-create'),
    #path('products/update/', ProductUpdateView.as_view(), name='product-update'),
    #path('products/<str:product_id>/delete/', ProductDeleteView.as_view(), name='product-delete')
]



############################################## DO NOT DELETE ##################################
# this will work if we want to handle the  CRUD all at once
# and there will be no need to handle urls one after the other


router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns += [
    path('', include(router.urls)),
]


