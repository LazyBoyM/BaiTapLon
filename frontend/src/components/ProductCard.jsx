import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import { useAuthStore } from '../lib/store'
import toast from 'react-hot-toast'
import { FiHeart, FiStar, FiShoppingBag, FiCheckCircle } from 'react-icons/fi'

export default function ProductCard({ product }) {
  const { isAuthenticated } = useAuthStore()
  const [inWishlist, setInWishlist] = useState(false)
  const [loading, setLoading] = useState(false)
  const [purchased, setPurchased] = useState(false)
  const [rating, setRating] = useState({ averageRating: 4.8, totalReviews: 12 })

  useEffect(() => {
    if (isAuthenticated) {
      api.get(`/products/${product._id}/wishlist`)
        .then(res => setInWishlist(res.data.inWishlist))
        .catch(() => {})
      
      api.get(`/orders/check/${product._id}`)
        .then(res => setPurchased(res.data.purchased))
        .catch(() => {})
    }
    api.get(`/reviews/product/${product._id}/rating`)
      .then(res => {
        if (res.data && res.data.totalReviews > 0) setRating(res.data)
      })
      .catch(() => {})
  }, [isAuthenticated, product._id])

  const toggleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để lưu yêu thích')
      return
    }
    setLoading(true)
    try {
      const res = await api.post(`/products/${product._id}/wishlist`)
      setInWishlist(res.data.inWishlist)
      toast.success(res.data.message)
    } catch {
      toast.error('Không thể thực hiện thao tác')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="group relative">
      <Link to={`/product/${product._id}`} className="block h-full">
        <div className="card-apple h-full flex flex-col overflow-hidden bg-white relative">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            <img
              src={product.thumbnail || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600'}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            
            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Discount Badge */}
            {product.discount > 0 && (
              <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[11px] font-extrabold rounded-full shadow-md tracking-wider">
                -{product.discount}%
              </div>
            )}

            {/* Category Tag */}
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-slate-700 uppercase tracking-wider shadow-sm">
              {product.category || 'Digital'}
            </div>

            {/* Purchased Badge */}
            {purchased && (
              <div className="absolute top-3 right-14 px-2.5 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md">
                <FiCheckCircle size={12} /> Đã sở hữu
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                  <FiStar className="text-amber-500 fill-amber-500" size={13} />
                  <span className="text-xs font-bold text-amber-700">
                    {rating.averageRating?.toFixed(1) || '4.8'}
                  </span>
                  <span className="text-[11px] text-amber-600/80 font-medium">
                    ({rating.totalReviews || 12})
                  </span>
                </div>
              </div>
              
              <h3 className="font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-snug text-base">
                {product.title}
              </h3>
            </div>

            {/* Price & Seller */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Giá sản phẩm</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {product.price?.toLocaleString('vi-VN')}đ
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs text-slate-400 line-through font-medium">
                      {product.oldPrice?.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                </div>
              </div>
              
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <FiShoppingBag size={16} />
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Wishlist Floating Button */}
      <button
        onClick={toggleWishlist}
        disabled={loading}
        title="Thêm vào yêu thích"
        className={`absolute top-3 right-3 w-9 h-9 rounded-full shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10 active:scale-90 ${
          inWishlist 
            ? 'bg-rose-500 text-white shadow-rose-500/30' 
            : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white'
        }`}
      >
        <FiHeart className={inWishlist ? 'fill-current' : ''} size={17} />
      </button>
    </div>
  )
}