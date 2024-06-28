from django.test import TestCase
from django.contrib.auth import get_user_model

USER_MODEL = get_user_model()

# Create your tests here.
class TestUserModel(TestCase):
    """
    Test coverage for the user model
    -- check that a user is created successfully
    -- test the model string method
    -- Check that different kinds of users are created - Vendor, User
    -- Test that the two users are not the same
    """

    @classmethod
    def setUpTestData(cls) -> None:
        """
        set obj needed for respective tests
        """

        cls.user1 = USER_MODEL.objects.create(
                   email = 'test@gmail.com',
                   password = 'pass',
                   first_name = 'solomon',   
                   last_name = 'uche',   
                   phone_number = 1234,   
        )

        cls.user2 = USER_MODEL.objects.create(
                   email = 'test1@gmail.com',
                   password = 'pass',
                   first_name = 'sol',   
                   last_name = 'uc',   
                   phone_number = 123,
                   is_vendor = True   
        )

    def test_user_creation(self):
        """
        check that a user is created successfully
        """

        self.assertEqual(self.user1.email, 'test@gmail.com')
    
    def test_user_str(self):
        """
        test the model string method
        """

        self.assertEqual(str(self.user1.email), 'test@gmail.com')
    
    def test_user_is_not_vendor(self):
        """
        test that user is not a vendor
        """

        self.assertEqual(self.user1.is_vendor, False)
    
    def test_user_is_vendor(self):
        """
        test that user is a vendor
        """

        self.assertEqual(self.user2.is_vendor, True)
    
    def test_users_not_same(self):
        """
        Test that the two users are not the same
        """

        self.assertNotEqual(self.user1.id, self.user2.id)
