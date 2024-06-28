from django.test import TestCase
#from django.contrib.auth.models import User
from users.models import User
from decimal import Decimal
from product.models import Product
# Create your tests here.

class ProductModelTest(TestCase):
    """Test case for the product Models"""

    def setUp(self):
        """Creating a user to associate with the product"""
        self.user = User.objects.create(
            email='testuser@gmail.com',
            password='12345',
            first_name='Test',
            last_name='User',
            phone_number='1234567890',
            is_vendor=True

        )
    
    def test_product_creation(self):
        """test for creating a product associating with one user"""
        product = Product.objects.create(
            user=self.user,
            name="Test Product",
            price=Decimal('5.00'),
            old_price=Decimal('10.00'),
            stock_count=100,
            product_status="available"
        )
        self.assertEqual(product.name, "Test Product")
        self.assertEqual(product.price, Decimal('5.00'))
        self.assertEqual(product.old_price, Decimal('10.00'))
        self.assertEqual(product.stock_count, 100)
        self.assertEqual(product.product_status, "available")

    def test_str_method(self):
        """Testing if it return the string representation"""
        product = Product.objects.create(
            user=self.user,
            name="Test Product"
        )
        self.assertEqual(str(product), "Test Product")
    
    def test_product_image_method(self):
        """testing the image method"""
        product = Product.objects.create(
            user=self.user,
            name="Test Product"
        )
        self.assertIn('<img src="', product.product_image())

    def test_get_percentage_method(self):
        """testing the percentage method"""
        product = Product.objects.create(
            user=self.user,
            name="Test Product",
            price=Decimal('5.00'),
            old_price=Decimal('10.00')
        )
        self.assertEqual(product.get_percentage(), 50.0)

        product_with_zero_old_price = Product.objects.create(
            user=self.user,
            name="Test Peoduct 2",
            price=Decimal('5.00'),
            old_price=Decimal('0.00')
        )
        self.assertEqual(product_with_zero_old_price.get_percentage(), 0)

    def test_default_values(self):
        """testing defaul vaues"""
        product = Product.objects.create(
            user=self.user,
            name="Test Product"
        )
        self.assertEqual(product.description, "This is the product")
        self.assertEqual(product.price, Decimal('0.00'))
        self.assertEqual(product.old_price, Decimal('2.99'))
        self.assertEqual(product.product_status, "available")
        self.assertEqual(product.stock_count, '10')
    
    def test_blank_null_fields(self):
        """testing nullable fields"""
        product = Product.objects.create(
            user=self.user,
            name="Test Product",
            description="",
            stock_count=None
        )
        self.assertEqual(product.description, "")
        self.assertIsNone(product.stock_count)