import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";
import Analytics from "./pages/admin/Analytics.jsx";
import TailorVerification from "./pages/admin/TailorVerification.jsx";
import ContentManagement from "./pages/admin/ContentManagement.jsx";
import Disputes from "./pages/admin/Disputes.jsx";
import Reports from "./pages/admin/Reports.jsx";
import AdminSettings from "./pages/admin/Settings.jsx";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Tailor Pages
import TailorDashboard from "./pages/tailor/Dashboard.jsx";
import TailorProfile from "./pages/tailor/Profile.jsx";
import Orders from "./pages/tailor/Orders.jsx";
import Services from "./pages/tailor/Services.jsx";
import Portfolio from "./pages/tailor/Portfolio.jsx";
import Calendar from "./pages/tailor/Calendar.jsx";
import TailorAnalytics from "./pages/tailor/Analytics.jsx";
import Messages from "./pages/tailor/Messages.jsx";

// Portal Layouts
import AdminPortal from "./pages/admin/AdminPortal.jsx";
import TailorPortal from "./pages/tailor/TailorPortal.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    // Redirect based on user type
    switch (user.type) {
      case "admin":
        return <Navigate to="/admin" replace />;
      case "tailor":
        return <Navigate to="/tailor/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Index />} /> */}

        {/* Admin Portal Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPortal />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="verification" element={<TailorVerification />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="disputes" element={<Disputes />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Tailor Portal Routes */}
        <Route
          path="/tailor"
          element={
            <ProtectedRoute allowedRoles={["tailor"]}>
              <TailorPortal />
            </ProtectedRoute>
          }
        >
          <Route index element={<TailorDashboard />} />
          <Route path="profile" element={<TailorProfile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="analytics" element={<TailorAnalytics />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
