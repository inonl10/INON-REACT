from pyexpat import model
from unicodedata import category
from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=200)
    imageUrl = models.CharField(max_length=5000)
    
    def __str__(self):
        return self.name

class Dish(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    description = models.TextField()
    imageUrl = models.CharField(max_length=5000)
    isGlutenFree = models.BooleanField()
    isVegeterian = models.BooleanField()
    category = models.ForeignKey(Category,on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Order(models.Model):
    dishes = models.ManyToManyField(Dish)
    time = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)
    address = models.CharField(max_length=300)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.first_name + ' ' + self.last_name






    




