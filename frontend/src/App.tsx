import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import SkillAnalysis from "./pages/dashboard/SkillAnalysis";
import PeerComparison from "./pages/dashboard/PeerComparison";
import Roadmap from "./pages/dashboard/Roadmap";
import Resources from "./pages/dashboard/Resources";
import Profile from "./pages/dashboard/Profile";
import SettingsPage from "./pages/dashboard/Settings";
import Ranking from "./pages/dashboard/Ranking";
import ResumeAnalyzer from "./pages/dashboard/ResumeAnalyzer";
import MockTests from "./pages/dashboard/MockTests";
import CompanyDashboard from "./pages/CompanyDashboard";
import NotFound from "./pages/NotFound";
import ProfileView from "./pages/ProfileView";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/company" element={<CompanyDashboard />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="skills" element={<SkillAnalysis />} />
              <Route path="peers" element={<PeerComparison />} />
              <Route path="ranking" element={<Ranking />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="resources" element={<Resources />} />
              <Route path="resume" element={<ResumeAnalyzer />} />
              <Route path="mock-tests" element={<MockTests />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile/:username" element={<ProfileView />} />
            
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
