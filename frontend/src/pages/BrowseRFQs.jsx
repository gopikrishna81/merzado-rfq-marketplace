import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function BrowseRFQs() {
  const navigate = useNavigate();

  const [rfqs, setRfqs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRFQs = async (searchValue = "") => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("access");

      const response = await api.get("/rfqs/browse/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: searchValue
          ? { search: searchValue }
          : {},
      });

      setRfqs(response.data);
    } catch (err) {
      setError("Failed to load RFQs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFQs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRFQs(search);
  };

  const handleClear = () => {
    setSearch("");
    fetchRFQs();
  };

  return (
    <div className="page browse-rfqs-page">
      <div className="page-header">
        <h1>Browse RFQs</h1>
        <p className="page-subtitle">
          Discover business requirements and find opportunities to supply.
        </p>

        <div className="page-header-actions">
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          <button onClick={() => navigate("/my-quotations")}>
            My Quotations
          </button>
        </div>
      </div>

      <form className="rfq-search-form" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search by product, description or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">
            Search
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>

      {loading && (
        <p className="loading">Loading available RFQs...</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      {!loading && !error && rfqs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>

          <h2>No RFQs found</h2>

          <p>
            No business requirements match your search.
            Try a different search term.
          </p>
        </div>
      )}

      {!loading && !error && rfqs.length > 0 && (
        <div className="browse-results-header">
          <h2>Available Requirements</h2>
          <span>
            {rfqs.length} {rfqs.length === 1 ? "RFQ" : "RFQs"} found
          </span>
        </div>
      )}

      {!loading && !error && rfqs.length > 0 && (
        <div className="rfq-list">
          {rfqs.map((rfq) => (
            <div key={rfq.id} className="rfq-card">
              <div className="rfq-card-header">
                <div>
                  <span className="rfq-label">
                    RFQ #{rfq.id}
                  </span>

                  <h2>{rfq.product_name}</h2>
                </div>
              </div>

              <p className="rfq-description">
                {rfq.description}
              </p>

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
                    {new Date(
                      rfq.deadline
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="rfq-actions">
                <button
                  onClick={() =>
                    navigate(`/browse-rfqs/${rfq.id}`)
                  }
                >
                  View Details & Submit Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseRFQs;