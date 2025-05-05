
from django.contrib.auth.models import User, Group
from rest_framework import serializers
 
from products.models import Product
from .models import Order

# only for crreate new order
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('customer', 'product', 'quantity', 'address', 'total_amount', 'payment_id', 'payment_token', 'delivery_time','delivery_date')    # new for datetime
        read_only_fields = ('invoice_no', )

# for list out order details
# new for trascation screen
class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('invoice_no', 'customer', 'product', 'address','quantity', 'total_amount', 'delivery_time','delivery_date')    
        depth = 1
