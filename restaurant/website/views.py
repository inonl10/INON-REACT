from django.shortcuts import render
from rest_framework import viewsets
from .models import Category,Dish,Order
from .serializers import CategorySerializer,DishSerializer,OrderSerializer
from rest_framework.filters import SearchFilter,OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class DishView(viewsets.ModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    filter_backends = [DjangoFilterBackend,SearchFilter,OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['^name']
    ordering_fields = ['name','price']
    ordering = ['name','price']

class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    
