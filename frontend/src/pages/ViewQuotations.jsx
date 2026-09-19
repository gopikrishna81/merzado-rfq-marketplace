import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ViewQuotations() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await api.get(`/rfqs/${id}/quotations/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuotations(response.data);
      } catch (err) {
        setError("Failed to load quotations.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, [id]);

  if (loading) {
    return <p className="loading">Loading quotations...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="page quotations-page">
      <div className="page-header">
        <h1>Supplier Quotations</h1>
        <p className="page-subtitle">
          Review quotations received for this RFQ.
        </p>

        <div className="page-header-actions">
          <button onClick={() => navigate("/my-rfqs")}>
            ← Back to My RFQs
          </button>
        </div>
      </div>

      {quotations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📨</div>

          <h2>No quotations yet</h2>

          <p>
            Suppliers have not submitted any quotations for this RFQ yet.
          </p>

          <button onClick={() => navigate("/my-rfqs")}>
            Back to My RFQs
          </button>
        </div>
      ) : (
        <div className="quotation-list">
          <div className="quotation-summary">
            <strong>{quotations.length}</strong>
            <span>
              {quotations.length === 1
                ? "quotation received"
                : "quotations received"}
            </span>
          </div>

          {quotations.map((quotation) => (
            <div className="quotation-card" key={quotation.id}>
              <div className="quotation-card-header">
                <div>
                  <span className="quotation-label">
                    Supplier
                  </span>

                  <h2>{quotation.supplier}</h2>
                </div>

                <div className="quotation-price">
                  ₹{Number(quotation.price).toLocaleString("en-IN")}
                </div>
              </div>

              <div className="quotation-details">
                <div className="quotation-detail">
                  <span>Estimated Delivery</span>
                  <strong>
                    {quotation.estimated_delivery_time}
                  </strong>
                </div>

                <div className="quotation-detail">
                  <span>Submitted</span>
                  <strong>
                    {new Date(
                      quotation.created_at
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="quotation-message">
                <span>Supplier Message</span>

                <p>
                  {quotation.message || "No message provided."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewQuotations;