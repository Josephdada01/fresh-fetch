from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsUser
from .serializers import ReviewSerializer
from .models import Review


class ReviewListView(generics.ListAPIView):
    """
    list api view
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewCreateView(generics.CreateAPIView):
    """
    Create api view
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsUser]


class ReviewUpdateView(generics.UpdateAPIView):
    """
    Update api view
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsUser]
    lookup_field = 'id'


class ReviewDeleteView(generics.DestroyAPIView):
    """
    Destroy api view
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsUser]
    lookup_field = 'id'


class ReviewDetailView(generics.RetrieveAPIView):
    """
    Retrieve api view
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_field = 'id'
