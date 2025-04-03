
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./components/dashboard/Dashboard"; 
import Discover from "./pages/Discover";
import MyJourney from "./pages/MyJourney";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Meditation from "./pages/Meditation";
import Workouts from "./pages/Workouts";
import Nutrition from "./pages/Nutrition";
import JournalPrompt from "./pages/JournalPrompt";
import PersonalityTest from "./pages/PersonalityTest";
import ContentDetail from "./pages/ContentDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected routes that require authentication */}
            <Route path="/dashboard" element={
              <ProtectedRoute requireAuth={true}>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute requireAuth={true}>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Main navigation routes - some require auth, some don't */}
            <Route path="/discover" element={<Discover />} />
            <Route path="/my-journey" element={
              <ProtectedRoute requireAuth={true}>
                <MyJourney />
              </ProtectedRoute>
            } />
            <Route path="/community" element={<Community />} />
            
            {/* Content detail page */}
            <Route path="/content/:contentType/:contentId" element={<ContentDetail />} />
            
            {/* Protected feature routes */}
            <Route path="/journal-prompt" element={
              <ProtectedRoute requireAuth={true}>
                <JournalPrompt />
              </ProtectedRoute>
            } />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/personality-test" element={<PersonalityTest />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
