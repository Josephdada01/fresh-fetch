from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse

USER_MODEL = get_user_model()

# Create your tests here.
class TestUsersView(TestCase):
    """
    Test users urls, and views
    -- Test registration view
    -- Test login view
    -- Test user detail view
    -- Test user edit profile view
    -- vendor list view
    """

    @classmethod
    def setUpTestData(cls) -> None:
        """
        set obj needed for respective tests
        """
        cls.client = Client()

        cls.user_data = {
                   "email": 'solo@gmail.com',
                   "password1": '1234test',
                   "password2": '1234test',
                   "first_name": 'solomon',   
                   "last_name": 'uche',   
                   "state": 'enugu',   
                   "city": 'enugu',   
                   "phone_number": '1234',
                }
        
        cls.user = USER_MODEL.objects.create(
                   email = 'test@gmail.com',
                   password = 'pass',
                   first_name = 'solomon',   
                   last_name = 'uche',   
                   phone_number = 1234,   
        )

    def test_user_registeration_view(self):
        """
        Test a registeration view work
        """

        self.url = '/api-auth/users/register/'

        response = self.client.post(self.url, data=self.user_data)

        self.assertEqual(response.status_code, 204)

        # check if the user is created in the database
        self.assertTrue(USER_MODEL.objects.filter(email=self.user_data['email']).exists())

    def test_user_must_be_logged_in(self):
        """
        Test that authentication is required to access user details
        """

        self.url = '/api-auth/users/user/'
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 403)

    def test_get_user_detail(self):
        """
        Test the Get method return the user details
        """
        
        self.url = '/api-auth/users/user/'
        self.client.force_login(self.user)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)

        # check for email in user details
        self.assertIn(response.data['email'], 'test@gmail.com')

    def test_user_can_edit_profile(self):
        """
        Test that the PUT method of the view works
        """

        self.user_data['first_name'] = 'Tester'
        self.url = '/api-auth/users/user/'
        self.client.force_login(self.user)

        response = self.client.put(self.url, data=self.user_data, content_type='application/json')
        # test that update was successful
        self.assertEqual(response.status_code, 200)
        # check for the new name in user details
        self.assertEqual(response.data['first_name'], 'Tester')

    def test_get_vendor_list(self):
        """
        Test the vendor list view works
        """

        url = reverse('vendors-list')
        response = self.client.get(url)
        #assert that the request was successful
        self.assertEqual(response.status_code, 200)
