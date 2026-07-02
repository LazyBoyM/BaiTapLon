import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import ProductCard from '../components/ProductCard'
import { FiArrowRight, FiDownload, FiCheckCircle, FiShield, FiTrendingUp, FiUsers, FiClock, FiStar, FiZap } from 'react-icons/fi'
import { useAuthStore } from '../lib/store'

export default function Home() {
  const { isAuthenticated, user } = useAuthStore()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products?limit=12')
        setProducts(response.data.products || [])
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeTab)

  const categories = [
    { id: 'all', label: '🔥 Tất cả sản phẩm' },
    { id: 'digital', label: '💻 Phần mềm & App' },
    { id: 'ebook', label: '📚 Sách & Ebook' },
    { id: 'course', label: '🎓 Khóa học Video' },
    { id: 'template', label: '🎨 Template & Design' },
  ]

  return (
    <div className="space-y-28 pb-28 overflow-hidden">
      {/* Hero Section with Glowing Orbs */}
      <section className="relative pt-12 md:pt-24 pb-16">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 border border-violet-500/50 text-violet-600 rounded-full text-xs md:text-sm font-black tracking-wide uppercase shadow-xl shadow-violet-500/10 backdrop-blur-md animate-pulse">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
              </span>
              👑 MarketHub v5.0 Masterpiece - 100% Jenkins CI/CD Automated
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-[1.08]">
              Khám phá tài nguyên <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500">
                chuẩn Apple & 60 FPS v5.0
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-normal">
              Kho giao diện, mã nguồn, khóa học và sản phẩm số chất lượng cao được kiểm duyệt khắt khe dành cho nhà phát triển và sáng tạo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/products" className="btn-apple-primary text-lg px-9 py-4 w-full sm:w-auto shadow-xl">
                Khám phá ngay <FiArrowRight className="ml-2" />
              </Link>
              {!isAuthenticated ? (
                <Link to="/register" className="btn-apple-secondary text-lg px-9 py-4 w-full sm:w-auto">
                  Trở thành đối tác bán
                </Link>
              ) : user?.role === 'seller' ? (
                <Link to="/my-products" className="btn-apple-secondary text-lg px-9 py-4 w-full sm:w-auto">
                  Quản lý gian hàng
                </Link>
              ) : (
                <Link to="/wishlist" className="btn-apple-secondary text-lg px-9 py-4 w-full sm:w-auto">
                  Sản phẩm đã lưu
                </Link>
              )}
            </div>

            {/* Live Stats Bar */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-slate-200/60">
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-black text-slate-800">10,000+</span>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sản phẩm số</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-black text-blue-600">0.1s</span>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tốc độ tải về</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-black text-slate-800">99.9%</span>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Khách hài lòng</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-black text-indigo-600">24/7</span>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Hỗ trợ kỹ thuật</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Glowing Orbs for 60 FPS Smooth Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-[150px] left-[10%] w-[550px] h-[550px] bg-gradient-to-br from-blue-400/25 to-indigo-500/25 rounded-full blur-[130px] animate-pulse-glow" />
          <div className="absolute top-[100px] right-[10%] w-[500px] h-[500px] bg-gradient-to-tl from-purple-400/25 to-pink-500/25 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <FiDownload size={26} />, 
              title: 'Tải xuống tự động tức thì', 
              desc: 'Hệ thống luân chuyển link tải an toàn với tốc độ cao ngay sau khi thanh toán Momo hoàn tất.',
              color: 'from-blue-500 to-indigo-600',
              bg: 'bg-blue-50/80 text-blue-600 border-blue-100'
            },
            { 
              icon: <FiCheckCircle size={26} />, 
              title: 'Bản quyền & Chất lượng', 
              desc: 'Tất cả tài nguyên đều trải qua khâu kiểm tra mã độc và đảm bảo chất lượng vận hành mượt mà.',
              color: 'from-emerald-500 to-teal-600',
              bg: 'bg-emerald-50/80 text-emerald-600 border-emerald-100'
            },
            { 
              icon: <FiShield size={26} />, 
              title: 'Thanh toán bảo mật tuyệt đối', 
              desc: 'Kết nối chuẩn hóa mã hóa kép qua cổng thanh toán Momo và kiến trúc Microservices tách biệt.',
              color: 'from-purple-500 to-pink-600',
              bg: 'bg-purple-50/80 text-purple-600 border-purple-100'
            }
          ].map((f, i) => (
            <div key={i} className="card-apple p-8 flex flex-col justify-between space-y-6 bg-white border border-slate-100/80 relative overflow-hidden group">
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${f.bg}`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                Trải nghiệm chuẩn 60 FPS <FiArrowRight />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Products Section */}
      <section className="container-custom space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs uppercase tracking-wider">
              <FiTrendingUp /> Sản phẩm nổi bật
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Tài nguyên được quan tâm
            </h2>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeTab === cat.id 
                    ? 'bg-slate-900 text-white shadow-md scale-105' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-[4/5] bg-slate-200/60 animate-pulse rounded-[var(--apple-radius)]" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 space-y-4">
            <p className="text-slate-400 text-lg">Chưa có sản phẩm nào trong chuyên mục này.</p>
            <button onClick={() => setActiveTab('all')} className="btn-apple-ghost">Xem tất cả sản phẩm</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center pt-6">
          <Link to="/products" className="btn-apple-secondary px-8 py-3.5 text-sm font-bold shadow-sm hover:shadow">
            Xem toàn bộ sản phẩm trong cửa hàng <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Testimonial / Social Proof Section */}
      <section className="container-custom">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[32px] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-12 relative z-10">
            <span className="text-blue-400 text-xs font-extrabold uppercase tracking-widest">Đánh giá thực tế</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Khách hàng & Nhà phát triển nói gì?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[
              {
                quote: "Tốc độ phản hồi cực kỳ nhanh nhạy. Giao diện mượt mà tuyệt đối kể cả trên thiết bị di động.",
                author: "Nguyễn Minh Tuấn",
                role: "Fullstack Developer",
                avatar: "T"
              },
              {
                quote: "Kiến trúc Microservices kết hợp CI/CD tự động giúp việc tải code và triển khai diễn ra chỉ trong vài giây.",
                author: "Trần Hoàng Long",
                role: "DevOps Engineer",
                avatar: "L"
              },
              {
                quote: "Mua sản phẩm số và tải xuống lập tức không hề gián đoạn. Giao dịch an toàn, rõ ràng.",
                author: "Lê Phương Thảo",
                role: "UI/UX Designer",
                avatar: "T"
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current" size={14} />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{t.author}</h4>
                    <span className="text-[11px] text-slate-400">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-20 md:px-20 md:py-24 text-center shadow-2xl shadow-blue-500/20">
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Sẵn sàng trải nghiệm <br /> nền tảng mượt mà nhất?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-xl mx-auto font-normal">
              Khám phá hàng ngàn tài nguyên số cao cấp và tự động hóa quy trình kinh doanh của bạn ngay hôm nay.
            </p>
            <div className="pt-2">
              <Link to={isAuthenticated ? "/products" : "/register"} className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-lg px-10 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95">
                {isAuthenticated ? "Khám phá cửa hàng ngay" : "Tạo tài khoản miễn phí"} <FiArrowRight />
              </Link>
            </div>
          </div>
          {/* Abstract circles */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </section>
    </div>
  )
}