import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get("/auth/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <p className="loading">Loading dashboard...</p>;
  }

  const isBuyer = user.role === "BUYER";

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Merzado</h1>
          <p>B2B RFQ Marketplace</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="welcome-section">
        <h2>Welcome, {user.username} 👋</h2>
        <p>
          {isBuyer
            ? "Manage your requirements and review supplier quotations."
            : "Discover business requirements and submit your quotations."}
        </p>
      </div>

      <div className="user-info">
        <div>
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>

        <div>
          <span>Account type</span>
          <strong>{isBuyer ? "Buyer" : "Supplier"}</strong>
        </div>
      </div>

      <h3 className="section-title">
        {isBuyer ? "Buyer Actions" : "Supplier Actions"}
      </h3>

      <div className="action-grid">
        {isBuyer ? (
          <>
            <div className="action-card">
              <div className="action-icon">＋</div>
              <h3>Create RFQ</h3>
              <p>
                Post a new business requirement and receive supplier
                quotations.
              </p>
              <button onClick={() => navigate("/create-rfq")}>
                Create RFQ
              </button>
            </div>

            <div className="action-card">
              <div className="action-icon">▣</div>
              <h3>My RFQs</h3>
              <p>
                View, edit and manage your submitted requirements.
              </p>
              <button onClick={() => navigate("/my-rfqs")}>
                View My RFQs
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="action-card">
              <div className="action-icon">⌕</div>
              <h3>Browse RFQs</h3>
              <p>
                Discover business requirements that match your services.
              </p>
              <button onClick={() => navigate("/browse-rfqs")}>
                Browse RFQs
              </button>
            </div>

            <div className="action-card">
              <div className="action-icon">₹</div>
              <h3>My Quotations</h3>
              <p>
                Review quotations you have submitted to buyers.
              </p>
              <button onClick={() => navigate("/my-quotations")}>
                View Quotations
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;