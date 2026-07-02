# 🚀 MarketHub - Hệ Thống E-Commerce Microservices Tinh Giản (5 Containers)

Đồ án môn học: **Quy trình và Công cụ Phát triển Phần mềm**  
Kiến trúc: **5 Containers Microservices** + **GitHub Actions CI/CD (Self-hosted Runner)**

---

## 🌟 1. KIẾN TRÚC HỆ THỐNG TINH GIẢN

Hệ thống được tối ưu hóa chạy cực nhẹ và ổn định, bao gồm 5 dịch vụ cốt lõi:

1. **Frontend (`marketplace-frontend` - Port 3000)**: Xây dựng bằng React/Vite, đóng gói siêu nhẹ trên Nginx Alpine.
2. **API Gateway (`marketplace-nginx-gateway` - Port 5000)**: Điều hướng toàn bộ lưu lượng API đến các backend services.
3. **User Service (`port 5001`)**: Quản lý tài khoản, phân quyền, xác thực JWT.
4. **Product Service (`port 5002`)**: Quản lý gian hàng, sản phẩm, tìm kiếm.
5. **Shared Database (`port 27017`)**: Một container MongoDB duy nhất dùng chung, lưu trữ dữ liệu bền vững qua Docker Volumes.

---

## 🔄 2. QUY TRÌNH TỰ ĐỘNG HÓA CI/CD

Hệ thống sử dụng **GitHub Actions** kết hợp **Self-Hosted Runner** chạy trực tiếp trên máy chủ Linux CentOS 7 để tự động hóa:

* **Continuous Integration (CI):** Tự động validate syntax cấu hình Docker Compose khi push code.
* **Continuous Deployment (CD):** Self-Hosted Runner tự động pull code mới nhất và cập nhật hệ thống ngay lập tức qua lệnh:
  ```bash
  docker compose -p marketplace up -d --build --remove-orphans
  ```

---

## 💻 3. HƯỚNG DẪN KIỂM TRA HỆ THỐNG DÀNH CHO GIẢNG VIÊN VẤN ĐÁP

### A. Kiểm tra danh sách container đang chạy:
```bash
docker ps
```

### B. Kiểm tra phản hồi trực tiếp từ Gateway:
```bash
curl -I http://127.0.0.1:5000/health
```

### C. Truy cập giao diện Website từ máy Client Windows:
Mở trình duyệt (khuyên dùng chế độ Ẩn danh `Ctrl + Shift + N`) và truy cập vào địa chỉ IP của máy chủ Linux:
* **Giao diện chính:** `http://<IP_MÁY_ẢO>:3000`
* **API Gateway:** `http://<IP_MÁY_ẢO>:5000`