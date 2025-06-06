
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "@/context/CartContext"
import { LocationProvider } from "@/context/LocationContext"
import { AuthProvider } from "@/context/AuthContext"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

// Import Pages
import Splash from "./pages/Splash"
import Onboarding from "./pages/Onboarding"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import AdminLogin from "./pages/auth/AdminLogin"
import DriverLogin from "./pages/auth/DriverLogin"
import Home from "./pages/Home"
import Listings from "./pages/Listings"
import GroceryHub from "./pages/GroceryHub"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import About from "./pages/About"
import FAQ from "./pages/FAQ"
import NotFound from "./pages/NotFound"
import OrderTracking from "./pages/OrderTracking"
import Checkout from "./pages/Checkout"
import OrderSuccess from "./pages/OrderSuccess"

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminProducts from "./pages/admin/AdminProducts"

// Driver Pages
import DriverDashboard from "./pages/driver/DriverDashboard"
import DriverOrders from "./pages/driver/DriverOrders"
import DriverEarnings from "./pages/driver/DriverEarnings"

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
      <Toaster />
      <Sonner />
      <AuthProvider>
        <LocationProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                {/* Root and splash routes */}
                <Route path="/" element={<Splash />} />
                <Route path="/splash" element={<Splash />} />
                <Route path="/onboarding" element={<Onboarding />} />
                
                {/* Authentication routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                
                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminUsers />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/orders" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminOrders />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/products" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminProducts />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Driver routes */}
                <Route path="/driver/login" element={<DriverLogin />} />
                <Route 
                  path="/driver/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['driver']}>
                      <DriverDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/driver/orders" 
                  element={
                    <ProtectedRoute allowedRoles={['driver']}>
                      <DriverOrders />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/driver/earnings" 
                  element={
                    <ProtectedRoute allowedRoles={['driver']}>
                      <DriverEarnings />
                    </ProtectedRoute>
                  } 
                />
                
                {/* User routes - Protected main app pages */}
                <Route 
                  path="/home" 
                  element={
                    <ProtectedRoute allowedRoles={['user', 'admin', 'driver']}>
                      <Home />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/listings" 
                  element={
                    <ProtectedRoute allowedRoles={['user', 'admin', 'driver']}>
                      <Listings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/grocery" 
                  element={
                    <ProtectedRoute allowedRoles={['user', 'admin', 'driver']}>
                      <GroceryHub />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/product/:id" 
                  element={
                    <ProtectedRoute allowedRoles={['user', 'admin', 'driver']}>
                      <ProductDetail />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute allowedRoles={['user', 'admin', 'driver']}>
                      <Cart />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/order/tracking/:orderId" 
                  element={
                    <ProtectedRoute allowedRoles={['user', 'admin', 'driver']}>
                      <OrderTracking />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute allowedRoles={['user', 'admin', 'driver']}>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/order/success" 
                  element={
                    <ProtectedRoute allowedRoles={['user', 'admin', 'driver']}>
                      <OrderSuccess />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </LocationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
