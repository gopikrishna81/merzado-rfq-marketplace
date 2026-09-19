import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyQuotations() {
  const navigate = useNavigate();

  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await api.get("/rfqs/quotations/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuotations(response.data);
      } catch (err) {
        setError("Failed to load your quotations.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, []);

  if (loading) {
    return <p className="loading">Loading your quotations...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="page my-quotations-page">
      <div className="page-header">
        <h1>My Quotations</h1>

        <p className="page-subtitle">
          Review the quotations you have submitted to buyers.
        </p>

        <div className="page-header-actions">
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          <button onClick={() => navigate("/browse-rfqs")}>
            Browse RFQs
          </button>
        </div>
      </div>

      {quotations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📄</div>

          <h2>No quotations yet</h2>

          <p>
            You haven't submitted any quotations yet. Browse available RFQs
            to find business opportunities.
          </p>

          <button onClick={() => navigate("/browse-rfqs")}>
            Browse Available RFQs
          </button>
        </div>
      ) : (
        <>
          <div className="quotation-summary">
            <strong>{quotations.length}</strong>

            <span>
              {quotations.length === 1
                ? "quotation submitted"
                : "quotations submitted"}
            </span>
          </div>

          <div className="my-quotation-list">
            {quotations.map((quotation) => (
              <div
                key={quotation.id}
                className="my-quotation-card"
              >
                <div className="my-quotation-header">
                  <div>
                    <span className="quotation-label">
                      Quotation #{quotation.id}
                    </span>

                    <h2>RFQ #{quotation.rfq}</h2>
                  </div>

                  <div className="quotation-price">
                    ₹{Number(quotation.price).toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="my-quotation-details">
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
                  <span>Your Message</span>

                  <p>
                    {quotation.message || "No message provided."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyQuotations;