from rest_framework import generics, filters

from .models import RFQ, Quotation
from .serializers import RFQSerializer, QuotationSerializer
from .permissions import IsBuyer, IsSupplier


class RFQListCreateView(generics.ListCreateAPIView):
    serializer_class = RFQSerializer
    permission_classes = [IsBuyer]

    def get_queryset(self):
        return RFQ.objects.filter(buyer=self.request.user)

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)


class RFQDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RFQSerializer
    permission_classes = [IsBuyer]

    def get_queryset(self):
        return RFQ.objects.filter(buyer=self.request.user)


class SupplierRFQListView(generics.ListAPIView):
    serializer_class = RFQSerializer
    permission_classes = [IsSupplier]
    filter_backends = [filters.SearchFilter]
    search_fields = ["product_name", "description", "delivery_location"]

    def get_queryset(self):
        return RFQ.objects.all()
class SupplierRFQDetailView(generics.RetrieveAPIView):
    serializer_class = RFQSerializer
    permission_classes = [IsSupplier]

    def get_queryset(self):
        return RFQ.objects.all()


class QuotationCreateListView(generics.ListCreateAPIView):
    serializer_class = QuotationSerializer
    permission_classes = [IsSupplier]

    def get_queryset(self):
        return Quotation.objects.filter(supplier=self.request.user)

    def perform_create(self, serializer):
        serializer.save(supplier=self.request.user)
class RFQQuotationListView(generics.ListAPIView):
    serializer_class = QuotationSerializer
    permission_classes = [IsBuyer]

    def get_queryset(self):
        return Quotation.objects.filter(
            rfq_id=self.kwargs["pk"],
            rfq__buyer=self.request.user,
        )