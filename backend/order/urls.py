from django.urls import path
from order.views import OrderList, OrderDetail

urlpatterns = [
    path('api/v1/orders/', OrderList.as_view(), name='order-list'),
    path('api/v1/orders/<int:pk>/', OrderDetail.as_view(), name='order-detail'),
]