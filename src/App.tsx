
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { CartProvider } from "@/context/CartContext"
import { LocationProvider } from "@/context/LocationContext"
import { AuthProvider } from "@/context/AuthContext"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SplashManager from "@/components/SplashManager"
import ErrorBoundary from "@/components/ErrorBoundary"
import LazyRoute from "@/components/lazy-route"
import SkipLink from "@/components/ui/skip-link"

// Import lazy-loaded components
import {
  LazyHome,
  LazyListings,
  LazyGroceryHub,
  LazyProductDetail,
  LazyCart,
  LazyProfile,
  LazyCheckout,
  LazyOrderSuccess,
  LazyOrderTracking,
  LazyAbout,
  LazyFAQ,
  LazyLogin,
  LazySignup,
  LazyForgotPassword,
  LazyResetPassword,
  LazyAdminDashboard,
  LazyAdminUsers,
  LazyAdminOrders,
  LazyAdminProducts,
  LazyDriverDashboard,
  LazyDriverOrders,
  LazyDriverEarnings,
} from "@/routes/lazy-routes"

// Import non-lazy components
import Onboarding from "./pages/Onboarding"
import AdminLogin from "./pages/auth/AdminLogin"
import DriverLogin from "./pages/auth/DriverLogin"
import NotFound from "./pages/NotFound"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false
    },
  },
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SkipLink />
      <Toaster />
      <Sonner />
      <AuthProvider>
        <LocationProvider>
          <CartProvider>
            <BrowserRouter>
              <ErrorBoundary>
                <SplashManager>
                  <main id="main-content">
                    <Routes>
                      {/* Root redirect */}
                      <Route path="/" element={<Navigate to="/home" replace />} />
                      
                      {/* Public routes */}
                      <Route path="/onboarding" element={<Onboarding />} />
                      <Route path="/auth/login" element={<LazyRoute><LazyLogin /></LazyRoute>} />
                      <Route path="/auth/signup" element={<LazyRoute><LazySignup /></LazyRoute>} />
                      <Route path="/auth/forgot-password" element={<LazyRoute><LazyForgotPassword /></LazyRoute>} />
                      <Route path="/auth/reset-password" element={<LazyRoute><LazyResetPassword /></LazyRoute>} />
                      <Route path="/about" element={<LazyRoute><LazyAbout /></LazyRoute>} />
                      <Route path="/faq" element={<LazyRoute><LazyFAQ /></LazyRoute>} />
                      
                      {/* Admin routes */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route 
                        path="/admin/dashboard" 
                        element={
                          <ProtectedRoute allowedRoles={['admin']}>
                            <LazyRoute><LazyAdminDashboard /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/admin/users" 
                        element={
                          <ProtectedRoute allowedRoles={['admin']}>
                            <LazyRoute><LazyAdminUsers /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/admin/orders" 
                        element={
                          <ProtectedRoute allowedRoles={['admin']}>
                            <LazyRoute><LazyAdminOrders /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/admin/products" 
                        element={
                          <ProtectedRoute allowedRoles={['admin']}>
                            <LazyRoute><LazyAdminProducts /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      
                      {/* Driver routes */}
                      <Route path="/driver/login" element={<DriverLogin />} />
                      <Route 
                        path="/driver/dashboard" 
                        element={
                          <ProtectedRoute allowedRoles={['driver']}>
                            <LazyRoute><LazyDriverDashboard /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/driver/orders" 
                        element={
                          <ProtectedRoute allowedRoles={['driver']}>
                            <LazyRoute><LazyDriverOrders /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/driver/earnings" 
                        element={
                          <ProtectedRoute allowedRoles={['driver']}>
                            <LazyRoute><LazyDriverEarnings /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      
                      {/* Protected user routes */}
                      <Route 
                        path="/home" 
                        element={
                          <ProtectedRoute>
                            <LazyRoute><LazyHome /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/listings" 
                        element={
                          <ProtectedRoute>
                            <LazyRoute><LazyListings /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/grocery" 
                        element={
                          <ProtectedRoute>
                            <LazyRoute><LazyGroceryHub /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/product/:id" 
                        element={
                          <ProtectedRoute>
                            <LazyRoute><LazyProductDetail /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/cart" 
                        element={
                          <ProtectedRoute>
                            <LazyRoute><LazyCart /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/profile" 
                        element={
                          <ProtectedRoute>
                            <LazyRoute><LazyProfile /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/order/tracking/:orderId" 
                        element={
                          <ProtectedRoute>
                            <LazyRoute><LazyOrderTracking /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/checkout" 
                        element={
                          <ProtectedRoute>
                            <LazyRoute><LazyCheckout /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/order/success" 
                        element={
                          <ProtectedRoute>
                            <LazyRoute><LazyOrderSuccess /></LazyRoute>
                          </ProtectedRoute>
                        } 
                      />
                      
                      {/* Catch all */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </SplashManager>
              </ErrorBoundary>
            </BrowserRouter>
          </CartProvider>
        </LocationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
