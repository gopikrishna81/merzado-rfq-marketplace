from django.conf import settings
from django.db import models


class RFQ(models.Model):
    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="rfqs",
    )
    product_name = models.CharField(max_length=255)
    description = models.TextField()
    quantity = models.PositiveIntegerField()
    delivery_location = models.CharField(max_length=255)
    deadline = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_name
class Quotation(models.Model):
    rfq = models.ForeignKey(
        RFQ,
        on_delete=models.CASCADE,
        related_name="quotations",
    )
    supplier = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="quotations",
    )
    price = models.DecimalField(max_digits=12, decimal_places=2)
    estimated_delivery_time = models.CharField(max_length=255)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.rfq.product_name} - {self.supplier.username}"