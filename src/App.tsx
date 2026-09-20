import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AppDataProvider } from "@/context/AppDataContext";

// Public pages
import { LandingPage } from "@/pages/LandingPage";
import { SignupPage } from "@/pages/SignupPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

// Customer layout + pages
import { CustomerLayout } from "@/layouts/CustomerLayout";
import { CustomerDashboard } from "@/pages/customer/CustomerDashboard";
import { TransactionsPage } from "@/pages/customer/TransactionsPage";
import { TransactionDetailsPage } from "@/pages/customer/TransactionDetailsPage";
import { RaiseDisputePage } from "@/pages/customer/RaiseDisputePage";
import { DisputeSuccessPage } from "@/pages/customer/DisputeSuccessPage";
import { MyDisputesPage } from "@/pages/customer/MyDisputesPage";
import { DisputeDetailsPage } from "@/pages/customer/DisputeDetailsPage";
import { ProfilePage } from "@/pages/customer/ProfilePage";
import { NotificationsPage } from "@/pages/customer/NotificationsPage";

// Admin layout + pages
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { AdminDisputesPage } from "@/pages/admin/AdminDisputesPage";
import { AdminDisputeDetailsPage } from "@/pages/admin/AdminDisputeDetailsPage";

function ProtectedRoute({
  children,
  requireAdmin,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Customer */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <CustomerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/app/dashboard" replace />} />

              <Route path="dashboard" element={<CustomerDashboard />} />

              <Route path="transactions" element={<TransactionsPage />} />

              <Route
                path="transactions/:id"
                element={<TransactionDetailsPage />}
              />

              <Route path="raise-dispute" element={<RaiseDisputePage />} />

              <Route path="dispute-success" element={<DisputeSuccessPage />} />

              <Route path="disputes" element={<MyDisputesPage />} />

              <Route path="disputes/:id" element={<DisputeDetailsPage />} />

              <Route path="notifications" element={<NotificationsPage />} />

              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate to="/admin/dashboard" replace />}
              />

              <Route path="dashboard" element={<AdminDashboard />} />

              <Route path="disputes" element={<AdminDisputesPage />} />

              <Route
                path="disputes/:id"
                element={<AdminDisputeDetailsPage />}
              />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AppDataProvider>
    </AuthProvider>
  );
}

export default App;
