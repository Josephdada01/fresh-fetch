from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from order.models import Order
from rest_framework import status
from order.serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from reviews.permissions import IsUser

# Create your views here.
class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    ordering = ['-order_date']  # Order by most recent orders

    def get_queryset(self):
        """
        return order list for a particular user
        """

        user = self.request.user
        obj = Order.objects.filter(user=user)

        return obj
    
    def get_permissions(self):
        """
        permissions checker
        """

        if self.request.method == 'POST':
            return [IsAuthenticated(), IsUser()]
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [AllowAny()]

    def create(self, request, *args, **kwargs):
        """
        create a new order based on the product ID
        """

        self.check_permissions(request)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
 