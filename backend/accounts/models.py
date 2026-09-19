from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    BUYER = "BUYER"
    SUPPLIER = "SUPPLIER"

    ROLE_CHOICES = [
        (BUYER, "Buyer"),
        (SUPPLIER, "Supplier"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
    )

    def __str__(self):
        return self.username