import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateRFQ() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    quantity: "",
    delivery_location: "",
    deadline: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("access");

      await api.post("/rfqs/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/my-rfqs");
    } catch (err) {
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Failed to create RFQ."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-rfq-page">
      <div className="create-rfq-header">
        <h1>Create RFQ</h1>
        <p>
          Post your business requirement and receive quotations from suppliers.
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
            placeholder="e.g. Commercial Water Purification Systems"
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
            placeholder="Describe your requirements, specifications, quality expectations, installation needs, etc."
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
              placeholder="Enter quantity"
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
              placeholder="e.g. Hyderabad"
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

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create RFQ"}
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

export default CreateRFQ;