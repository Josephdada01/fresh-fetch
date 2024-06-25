from django.urls import path
from .views import ReviewCreateView, ReviewListView, ReviewDetailView, ReviewDeleteView, ReviewUpdateView

urlpatterns = [
    path('', ReviewListView.as_view(), name='review-list'),
    path('create/', ReviewCreateView.as_view(), name='review-create'),
    path('<int:id>/', ReviewDetailView.as_view(), name='review-detail'),
    path('<int:id>/update/', ReviewUpdateView.as_view(), name='review-update'),
    path('<int:id>/delete/', ReviewDeleteView.as_view(), name='review-delete'),
]