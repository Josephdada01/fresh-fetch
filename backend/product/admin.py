from django.contrib import admin
from product.models import Product

# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ('name', 'user', 'price', 'product_status', 'date_added')
    search_fields = ('name', 'user__email')

admin.site.register(Product, ProductAdmin)