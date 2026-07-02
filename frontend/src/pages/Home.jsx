import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import ProductCard from "../components/ProductCard";
import { FiArrowRight } from "react-icons/fi";
import { useAuthStore } from "../lib/store";

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products?limit=12");
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category?.toLowerCase() === activeTab);

  const categories = [
    { id: "all", label: "🔥 Tất cả" },
    { id: "digital", label: "💻 Phần mềm" },
    { id: "ebook", label: "📚 Sách & Ebook" },
    { id: "course", label: "🎓 Khóa học" },
    { id: "template", label: "🎨 Thiết kế" },
  ];

  return (
    <div className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center pt-16 pb-12 space-y-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
          Chợ Sản Phẩm Số{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            MarketHub
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Tìm kiếm giao diện, mã nguồn, tài liệu và tài nguyên số cao cấp phục vụ học tập và phát triển dự án.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/products" className="btn-apple-primary px-8 py-3.5 text-base shadow-lg">
            Khám phá cửa hàng <FiArrowRight className="ml-2 inline" />
          </Link>
        </div>
      </section>

      {/* Product Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <h2 className="text-2xl font-bold text-slate-900">Sản phẩm nổi bật</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === cat.id
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-slate-200/60 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-400">Chưa có sản phẩm nào trong danh mục này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
