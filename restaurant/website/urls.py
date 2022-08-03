from django.urls import path,include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

router.register('categories',views.CategoryView)
router.register('dish',views.DishView)
router.register('order',views.OrderView)


urlpatterns = [
    path('',include(router.urls))
]