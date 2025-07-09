
import { lazy } from 'react';

// Lazy load page components
export const LazyHome = lazy(() => import('@/pages/Home'));
export const LazyListings = lazy(() => import('@/pages/Listings'));
export const LazyGroceryHub = lazy(() => import('@/pages/GroceryHub'));
export const LazyProductDetail = lazy(() => import('@/pages/ProductDetail'));
export const LazyCart = lazy(() => import('@/pages/Cart'));
export const LazyProfile = lazy(() => import('@/pages/Profile'));
export const LazyCheckout = lazy(() => import('@/pages/Checkout'));
export const LazyOrderSuccess = lazy(() => import('@/pages/OrderSuccess'));
export const LazyOrderTracking = lazy(() => import('@/pages/OrderTracking'));
export const LazyAbout = lazy(() => import('@/pages/About'));
export const LazyFAQ = lazy(() => import('@/pages/FAQ'));

// Auth pages
export const LazyLogin = lazy(() => import('@/pages/auth/Login'));
export const LazySignup = lazy(() => import('@/pages/auth/Signup'));
export const LazyForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'));
export const LazyResetPassword = lazy(() => import('@/pages/auth/ResetPassword'));

// Admin pages
export const LazyAdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
export const LazyAdminUsers = lazy(() => import('@/pages/admin/AdminUsers'));
export const LazyAdminOrders = lazy(() => import('@/pages/admin/AdminOrders'));
export const LazyAdminProducts = lazy(() => import('@/pages/admin/AdminProducts'));

// Driver pages
export const LazyDriverDashboard = lazy(() => import('@/pages/driver/DriverDashboard'));
export const LazyDriverOrders = lazy(() => import('@/pages/driver/DriverOrders'));
export const LazyDriverEarnings = lazy(() => import('@/pages/driver/DriverEarnings'));
