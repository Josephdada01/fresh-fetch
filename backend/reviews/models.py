from django.db import models
from users.models import User


class Review(models.Model):
    """
    User review model
    """

    content = models.CharField(max_length=500)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # product_id = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        """
        Model string representation
        """

        return f"REVIEW_ID: {self.id}"