from rest_framework import generics
from .serializers import UserDetailsSerializer
from .models import User
from rest_framework.permissions import IsAuthenticated
from .permissions import IsVendor
from order.models import Order
from order.serializers import OrderSerializer
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied


class VendorListView(generics.ListAPIView):
    """
    list api view returns the list of vendors
    """

    queryset = User.objects.filter(is_vendor=True)
    serializer_class = UserDetailsSerializer


class VendorOrderListView(generics.ListAPIView):
    """
    returna list of order recieved by the vendor
    """

    permission_classes = [IsAuthenticated, IsVendor]
    serializer_class = OrderSerializer

    def get_queryset(self):
        """
        Return a list of all the vendor's Orders.
        """
        vendor_id = self.request.user.id
        return Order.objects.filter(vendor_id=vendor_id, paid_status=True)


class VendorOrderUpdateView(generics.UpdateAPIView):
    """
    Update order status
    """

    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, IsVendor]

    def get_object(self):
        """
        Override get_object to filter by order id and vendor id
        """
        order_id = self.kwargs.get('order_id')
        vendor_id = self.request.user.id

        # Retrieve the order by its primary key and vendor_id
        try:
            obj = Order.objects.get(id=order_id, vendor_id=vendor_id, paid_status=True)
            return obj
        except Order.DoesNotExist:
            raise NotFound("Order not found or changing order status for unpaid orders is not allowed")

    def get_serializer_context(self):
        # pass vendor permission into the serializer context
        context = super().get_serializer_context()
        context['is_vendor'] = self.request.user.is_vendor
        return context

    def update(self, request, *args, **kwargs):
        """
        Update the order
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
