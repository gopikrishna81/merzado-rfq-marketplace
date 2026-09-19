from django.urls import path

from .views import (
    RFQListCreateView,
    RFQDetailView,
    SupplierRFQListView,
    SupplierRFQDetailView,
    QuotationCreateListView,
    RFQQuotationListView,
)


urlpatterns = [
    path("browse/", SupplierRFQListView.as_view(), name="supplier-rfq-list"),
    path("quotations/", QuotationCreateListView.as_view(), name="quotation-list-create"),

    path("", RFQListCreateView.as_view(), name="rfq-list-create"),
    path(
    "<int:pk>/quotations/",
    RFQQuotationListView.as_view(),
    name="rfq-quotations",
    ),
    path(
    "browse/<int:pk>/",
    SupplierRFQDetailView.as_view(),
    name="supplier-rfq-detail",
    ),
    path("<int:pk>/", RFQDetailView.as_view(), name="rfq-detail"),

]