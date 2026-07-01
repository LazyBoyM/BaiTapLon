import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../lib/store'
import { useState, useEffect } from 'react'
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiLogOut, FiHeart, FiTag, FiTrendingUp, FiSparkles } from 'react-icons/fi'
import NotificationBell from './NotificationBell'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowMenu(false)
  }

  const isAdmin = user?.role === 'admin'
  const isSeller = user?.role === 'seller'

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3' : 'py-5'
    }`}>
      <div className="container-custom">
        <nav className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${
          isScrolled ? 'glass shadow-lg border border-white/60' : 'bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm'
        }`}>
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/25 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <FiSparkles className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                MarketHub<span className="text-blue-600">.</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase -mt-1">
                Digital Store
              </span>
            </div>
          </Link>
          
          {/* Actions & User Menu */}
          <div className="flex items-center gap-3">
            <Link 
              to="/products"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all"
            >
              <FiSearch size={16} className="text-slate-400" />
              Khám phá sản phẩm
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NotificationBell />
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/80 hover:bg-slate-200/60 transition-all shadow-sm active:scale-95"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-bold text-slate-700 hidden sm:block max-w-[120px] truncate">{user?.name}</span>
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl py-2 animate-fade-in border border-slate-100 divide-y divide-slate-100">
                      <div className="px-5 py-3.5">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Đăng nhập bởi</p>
                        <p className="font-bold text-slate-800 text-sm truncate">{user?.email}</p>
                        <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          isAdmin ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                          isSeller ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          {isAdmin ? '🛡️ Quản trị viên' : isSeller ? '💼 Người bán' : '👤 Khách hàng'}
                        </span>
                      </div>

                      <div className="p-2 space-y-1">
                        {!isAdmin && (
                          <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors" onClick={() => setShowMenu(false)}>
                            <FiUser className="text-slate-400" /> Hồ sơ cá nhân
                          </Link>
                        )}

                        {isAdmin ? (
                          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors" onClick={() => setShowMenu(false)}>
                            <FiMenu className="text-slate-400" /> Trang quản trị Admin
                          </Link>
                        ) : isSeller ? (
                          <>
                            <Link to="/seller-analytics" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors" onClick={() => setShowMenu(false)}>
                              <FiTrendingUp className="text-slate-400" /> Thống kê doanh thu
                            </Link>
                            <Link to="/my-products" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors" onClick={() => setShowMenu(false)}>
                              <FiShoppingBag className="text-slate-400" /> Quản lý sản phẩm
                            </Link>
                            <Link to="/seller-orders" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors" onClick={() => setShowMenu(false)}>
                              <FiShoppingBag className="text-slate-400" /> Đơn đặt hàng
                            </Link>
                            <Link to="/seller-coupons" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors" onClick={() => setShowMenu(false)}>
                              <FiTag className="text-slate-400" /> Mã giảm giá
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link to="/wishlist" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors" onClick={() => setShowMenu(false)}>
                              <FiHeart className="text-slate-400" /> Yêu thích của tôi
                            </Link>
                            <Link to="/my-orders" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors" onClick={() => setShowMenu(false)}>
                              <FiShoppingBag className="text-slate-400" /> Lịch sử mua hàng
                            </Link>
                          </>
                        )}
                      </div>

                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          <FiLogOut /> Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors px-3 py-2">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn-apple-primary text-sm px-6 py-2.5">
                  Bắt đầu ngay
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}