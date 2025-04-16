import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Machinery from "./pages/Machinery";
import PalmMap from "./pages/PalmMap";
import Activity from "./pages/Activity";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import TreeDetail from "./components/TreeDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default pages under layout */}
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/machinery" element={<Layout><Machinery /></Layout>} />
          <Route path="/map" element={<Layout><PalmMap /></Layout>} />
          <Route path="/activity" element={<Layout><Activity /></Layout>} />
          <Route path="/alerts" element={<Layout><Alerts /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />

          {/* Tree detail with layout */}
          <Route path="/tree/:id" element={<Layout><TreeDetail /></Layout>} />

          {/* Optional map without layout for focused display */}
          <Route path="/standalone-map" element={<PalmMap />} />

          {/* 404 fallback */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
