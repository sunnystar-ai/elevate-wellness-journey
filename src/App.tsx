import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
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
            
            {/* Main navigation routes - accessible without authentication */}
            <Route path="/discover" element={
              <ProtectedRoute requireAuth={false}>
                <Discover />
              </ProtectedRoute>
            } />
            <Route path="/my-journey" element={
              <ProtectedRoute requireAuth={false}>
                <MyJourney />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute requireAuth={false}>
                <Community />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute requireAuth={false}>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Protected feature routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/journal-prompt" element={
              <ProtectedRoute requireAuth={false}>
                <JournalPrompt />
              </ProtectedRoute>
            } />
            <Route path="/meditation" element={
              <ProtectedRoute requireAuth={false}>
                <Meditation />
              </ProtectedRoute>
            } />
            <Route path="/workouts" element={
              <ProtectedRoute requireAuth={false}>
                <Workouts />
              </ProtectedRoute>
            } />
            <Route path="/nutrition" element={
              <ProtectedRoute requireAuth={false}>
                <Nutrition />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
            <Route path="/personality-test" element={<PersonalityTest />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
