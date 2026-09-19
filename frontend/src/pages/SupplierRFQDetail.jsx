import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function SupplierRFQDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rfq, setRfq] = useState(null);
  const [formData, setFormData] = useState({
    price: "",
    estimated_delivery_time: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchRFQ = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await api.get(`/rfqs/browse/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRfq(response.data);
      } catch (err) {
        setError("Failed to load RFQ.");
      } finally {
        setLoading(false);
      }
    };

    fetchRFQ();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("access");

      await api.post(
        "/rfqs/quotations/",
        {
          rfq: Number(id),
          price: formData.price,
          estimated_delivery_time: formData.estimated_delivery_time,
          message: formData.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Quotation submitted successfully!");

      setFormData({
        price: "",
        estimated_delivery_time: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Failed to submit quotation."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="loading">Loading RFQ...</p>;
  }

  if (error && !rfq) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="page supplier-rfq-detail-page">
      <div className="page-header">
        <h1>RFQ Details</h1>

        <p className="page-subtitle">
          Review the buyer's requirements and submit your quotation.
        </p>

        <div className="page-header-actions">
          <button onClick={() => navigate("/browse-rfqs")}>
            ← Back to Browse RFQs
          </button>
        </div>
      </div>

      {rfq && (
        <>
          <div className="supplier-rfq-card">
            <div className="supplier-rfq-title">
              <span>RFQ #{rfq.id}</span>
              <h2>{rfq.product_name}</h2>
            </div>

            <div className="supplier-rfq-description">
              <span>Requirement Description</span>
              <p>{rfq.description}</p>
            </div>

            <div className="rfq-details">
              <div className="detail-item">
                <span>Quantity</span>
                <strong>{rfq.quantity}</strong>
              </div>

              <div className="detail-item">
                <span>Delivery Location</span>
                <strong>{rfq.delivery_location}</strong>
              </div>

              <div className="detail-item">
                <span>Deadline</span>
                <strong>
                  {new Date(rfq.deadline).toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          <div className="quotation-form-section">
            <div className="quotation-form-header">
              <h2>Submit Your Quotation</h2>
              <p>
                Provide your price, delivery estimate and any additional
                information for the buyer.
              </p>
            </div>

            <form
              className="quotation-form"
              onSubmit={handleSubmit}
            >
              <div className="form-field">
                <label htmlFor="price">
                  Quotation Price (₹)
                </label>

                <input
                  id="price"
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="Enter your quotation price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="estimated_delivery_time">
                  Estimated Delivery Time
                </label>

                <input
                  id="estimated_delivery_time"
                  type="text"
                  name="estimated_delivery_time"
                  placeholder="e.g. 10-15 business days"
                  value={formData.estimated_delivery_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="message">
                  Message / Notes
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Add specifications, warranty details, payment terms or any other information..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}

              {success && (
                <div className="form-success">
                  {success}
                </div>
              )}

              <div className="quotation-form-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => navigate("/browse-rfqs")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Quotation"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default SupplierRFQDetail;