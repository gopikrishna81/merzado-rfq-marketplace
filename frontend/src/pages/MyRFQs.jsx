import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyRFQs() {
  const navigate = useNavigate();

  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRFQs = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await api.get("/rfqs/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRfqs(response.data);
      } catch (err) {
        setError("Failed to load your RFQs.");
      } finally {
        setLoading(false);
      }
    };

    fetchRFQs();
  }, []);

  const handleDelete = async (rfqId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this RFQ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("access");

      await api.delete(`/rfqs/${rfqId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRfqs((currentRfqs) =>
        currentRfqs.filter((item) => item.id !== rfqId)
      );
    } catch (err) {
      alert("Failed to delete RFQ.");
    }
  };

  if (loading) {
    return <p className="loading">Loading your RFQs...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="page my-rfqs-page">
      <div className="my-rfqs-header">
        <h1>My RFQs</h1>

        <p>
          Manage your business requirements and review supplier quotations.
        </p>

        <div className="my-rfqs-header-actions">
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          <button onClick={() => navigate("/create-rfq")}>
            + Create RFQ
          </button>
        </div>
      </div>

      {rfqs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>

          <h2>No RFQs yet</h2>

          <p>
            You haven't created any requirements yet. Create your first RFQ
            to start receiving supplier quotations.
          </p>

          <button onClick={() => navigate("/create-rfq")}>
            Create Your First RFQ
          </button>
        </div>
      ) : (
        <div className="rfq-list">
          {rfqs.map((rfq) => (
            <div key={rfq.id} className="rfq-card">
              <div className="rfq-card-header">
                <span className="rfq-label">RFQ #{rfq.id}</span>

                <h2>{rfq.product_name}</h2>
              </div>

              <p className="rfq-description">
                {rfq.description}
              </p>

              <div className="rfq-details">
                <div className="detail-item">
                  <span>Quantity:</span>
                  <strong>{rfq.quantity}</strong>
                </div>

                <div className="detail-item">
                  <span>Delivery Location:</span>
                  <strong>{rfq.delivery_location}</strong>
                </div>

                <div className="detail-item">
                  <span>Deadline:</span>
                  <strong>
                    {new Date(rfq.deadline).toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="rfq-actions">
                <button
                  onClick={() =>
                    navigate(`/rfqs/${rfq.id}/quotations`)
                  }
                >
                  View Quotations
                </button>

                <button
                  onClick={() => navigate(`/rfqs/${rfq.id}/edit`)}
                >
                  Edit RFQ
                </button>

                <button
                  className="danger-btn"
                  onClick={() => handleDelete(rfq.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRFQs;