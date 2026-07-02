import { Link } from 'react-router-dom'
import { useAuthStore } from '../lib/store'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Dashboard() {
  const { user } = useAuthStore()

  // Seller Dashboard -> chuyển hướng về trang quản lý sản phẩm
  if (user?.role === 'seller') {
    window.location.href = '/my-products'
    return null
  }


  // Buyer Dashboard (tối giản)
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Xin chào, {user?.name}!</h1>
      <Card>
        <p className="text-gray-600 mb-4">Khám phá hàng ngàn sản phẩm số chất lượng cao.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/products">
            <Button>Khám phá sản phẩm</Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="secondary">Yêu thích</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}