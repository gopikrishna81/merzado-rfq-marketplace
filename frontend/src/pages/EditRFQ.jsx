import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditRFQ() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    quantity: "",
    delivery_location: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRFQ = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await api.get(`/rfqs/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const rfq = response.data;

        setFormData({
          product_name: rfq.product_name,
          description: rfq.description,
          quantity: rfq.quantity,
          delivery_location: rfq.delivery_location,
          deadline: rfq.deadline.slice(0, 16),
        });
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
    setSaving(true);

    try {
      const token = localStorage.getItem("access");

      await api.put(`/rfqs/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/my-rfqs");
    } catch (err) {
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Failed to update RFQ."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="loading">Loading RFQ...</p>;
  }

  if (error && !formData.product_name) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="create-rfq-page">
      <div className="create-rfq-header">
        <h1>Edit RFQ</h1>

        <p>
          Update your business requirement details before saving your changes.
        </p>
      </div>

      <form className="create-rfq-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="product_name">
            Product / Service Name
          </label>

          <input
            id="product_name"
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">
            Requirement Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="quantity">
              Quantity
            </label>

            <input
              id="quantity"
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="delivery_location">
              Delivery Location
            </label>

            <input
              id="delivery_location"
              type="text"
              name="delivery_location"
              value={formData.delivery_location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="deadline">
            RFQ Deadline
          </label>

          <input
            id="deadline"
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />

          <small>
            Suppliers must submit their quotations before this deadline.
          </small>
        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="create-rfq-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/my-rfqs")}
          >
            Cancel
          </button>

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      <div className="back-dashboard">
        <button
          className="link-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default EditRFQ;