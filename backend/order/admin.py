from django.contrib import admin
from order.models import Order
# Register your models here.


class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ('user', 'id', 'order_date',
                    'paid_status',)
    search_fields = ('user', 'id', 'order_date')

admin.site.register(Order, OrderAdmin)

"""
class OrderItemsAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price')
    search_fields = ('order', 'product')

admin.site.register(OrderItems, OrderItemsAdmin)
"""
