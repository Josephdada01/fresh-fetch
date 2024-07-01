from django.urls import path, include
from .views import VendorListView, VendorOrderListView, VendorOrderUpdateView

urlpatterns = [
    path('users/', include('dj_rest_auth.urls')),
    path('users/register/', include('dj_rest_auth.registration.urls')),
    path('vendors/', VendorListView.as_view(), name='vendors-list'),
    path('vendors/orders/', VendorOrderListView.as_view(), name='vendors-orders'),
    path('vendors/orders/<order_id>/', VendorOrderUpdateView.as_view(), name='vendors-orders-update'),
]