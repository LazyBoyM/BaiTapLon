import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Dashboard from './pages/Dashboard'
import CreateProduct from './pages/CreateProduct'
import MyProducts from './pages/MyProducts'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminProducts from './pages/AdminProducts'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { useAuthStore } from './lib/store'
import { useEffect } from 'react'
import AdminAnalytics from './pages/AdminAnalytics'
import Shop from './pages/Shop'
import Wishlist from './pages/Wishlist'
import EditProduct from './pages/EditProduct'
import SellerAnalytics from './pages/SellerAnalytics'

function App() {

  const { loadUser } = useAuthStore()
  
  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="seller-analytics" element={<SellerAnalytics />} />

          <Route path="profile" element={<Profile />} />
          <Route path="shop/:sellerId" element={<Shop />} />
          
          {/* Admin Routes */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/analytics" element={<AdminAnalytics />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App