import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateRFQ from "./pages/CreateRFQ";
import MyRFQs from "./pages/MyRFQs";
import ViewQuotations from "./pages/ViewQuotations";
import EditRFQ from "./pages/EditRFQ";
import BrowseRFQs from "./pages/BrowseRFQs";
import SupplierRFQDetail from "./pages/SupplierRFQDetail";
import MyQuotations from "./pages/MyQuotations";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-rfq"
          element={
            <ProtectedRoute allowedRole="BUYER">
              <CreateRFQ />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-rfqs"
          element={
            <ProtectedRoute allowedRole="BUYER">
              <MyRFQs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rfqs/:id/edit"
          element={
            <ProtectedRoute allowedRole="BUYER">
              <EditRFQ />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rfqs/:id/quotations"
          element={
            <ProtectedRoute allowedRole="BUYER">
              <ViewQuotations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/browse-rfqs"
          element={
            <ProtectedRoute>
              <BrowseRFQs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/browse-rfqs/:id"
          element={
            <ProtectedRoute>
              <SupplierRFQDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-quotations"
          element={
            <ProtectedRoute>
              <MyQuotations />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;