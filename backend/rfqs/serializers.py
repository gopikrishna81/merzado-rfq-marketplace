from django.utils import timezone
from rest_framework import serializers

from .models import RFQ, Quotation


class RFQSerializer(serializers.ModelSerializer):
    buyer = serializers.ReadOnlyField(source="buyer.username")

    class Meta:
        model = RFQ
        fields = [
            "id",
            "buyer",
            "product_name",
            "description",
            "quantity",
            "delivery_location",
            "deadline",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "buyer",
            "created_at",
            "updated_at",
        ]

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be greater than 0."
            )
        return value

    def validate_deadline(self, value):
        if value <= timezone.now():
            raise serializers.ValidationError(
                "Deadline must be in the future."
            )
        return value


class QuotationSerializer(serializers.ModelSerializer):
    supplier = serializers.ReadOnlyField(source="supplier.username")

    rfq = serializers.PrimaryKeyRelatedField(
        queryset=RFQ.objects.all()
    )

    class Meta:
        model = Quotation
        fields = [
            "id",
            "rfq",
            "supplier",
            "price",
            "estimated_delivery_time",
            "message",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "supplier",
            "created_at",
            "updated_at",
        ]

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Price cannot be negative."
            )
        return value

    def validate(self, attrs):
        rfq = attrs.get("rfq")
        request = self.context["request"]

        if rfq and rfq.buyer_id == request.user.id:
            raise serializers.ValidationError(
                "You cannot submit a quotation for your own RFQ."
            )

        if rfq and rfq.deadline <= timezone.now():
            raise serializers.ValidationError(
                "This RFQ deadline has passed."
            )

        return attrs