import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            
            {/* Admin Portal Routes */}
            <Route path="admin" element={<AdminPortal />}>
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
            <Route path="tailor" element={<TailorPortal />}>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
