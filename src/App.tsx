import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import NotFound from "./pages/NotFound";
import { LoaderProvider } from "./loader/LoaderContext.jsx";
import Loader from "./loader/Loader.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { ToastContainer, Bounce } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";
import Analytics from "./pages/admin/Analytics.jsx";
import TailorVerification from "./pages/admin/TailorVerification.jsx";
import ContentManagement from "./pages/admin/ContentManagement.jsx";
import Disputes from "./pages/admin/Disputes.jsx";
import Reports from "./pages/admin/Reports.jsx";
import AdminSettings from "./pages/admin/Settings.jsx";
import { AuthProvider } from "@/contexts/AuthContext";

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
import { PublicRoute } from "./ProtectedRoute.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes - Public */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/tailor/register"
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

      {/* Protected Routes with Layout - Only wrap the parent with ProtectedRoute */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Admin Portal Routes */}
        <Route path="admin" element={<AdminPortal />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="verification" element={<TailorVerification />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="disputes" element={<Disputes />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Tailor Portal Routes */}
        <Route path="tailor" element={<TailorPortal />}>
          <Route path="dashboard" element={<TailorDashboard />} />
          <Route path="profile" element={<TailorProfile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="analytics" element={<TailorAnalytics />} />
          <Route path="messages" element={<Messages />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Redirect root to appropriate dashboard based on user role */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TooltipProvider>
          <Toaster />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
          <Sonner />
          <BrowserRouter>
            <LoaderProvider>
              <Loader />
              <AuthProvider>
                <AppRoutes />
              </AuthProvider>
            </LoaderProvider>
          </BrowserRouter>
        </TooltipProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);

export default App;
