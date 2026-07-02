#  Sao lưu dự phòng các file cấu hình repo cũ
sudo cp -a /etc/yum.repos.d /etc/yum.repos.d.backup

#  Thay thế toàn bộ link mirror cũ bằng link lưu trữ (Vault)
sudo sed -i s/mirror.centos.org/vault.centos.org/g /etc/yum.repos.d/CentOS-*.repo
sudo sed -i s/^#.*baseurl=http/baseurl=http/g /etc/yum.repos.d/CentOS-*.repo
sudo sed -i s/^mirrorlist=http/#mirrorlist=http/g /etc/yum.repos.d/CentOS-*.repo

#  Dọn dẹp cache cũ và khởi tạo danh mục gói mới
sudo yum clean all
sudo yum makecache

sudo yum update -y
sudo yum install -y git curl unzip


# Thêm repository chính thức của Docker
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Cài đặt công cụ Docker
sudo yum install -y docker-ce docker-ce-cli containerd.io

# Khởi động và kích hoạt tự khởi động cùng hệ thống
sudo systemctl start docker
sudo systemctl enable docker


# Tải Docker Compose phiên bản ổn định
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Cấp quyền thực thi
sudo chmod +x /usr/local/bin/docker-compose

# Kiểm tra xem cài đặt thành công chưa
docker-compose --version


# Tạo thư mục marketplace-git ngay tại thư mục cá nhân của user centos
mkdir -p ~/marketplace-git
cd ~/marketplace-git

# Thực hiện clone code về đây
git clone https://github.com/LazyBoyM/BaiTapLon.git .

sudo docker compose -p marketplace up -d --build

# Thêm user centos vào nhóm docker
sudo usermod -aG docker centos

# Đăng xuất và đăng nhập lại để áp dụng thay đổi
exit
# SSH lại vào server

#  Di chuyển vào thư mục dự án trên CentOS
cd ~/marketplace-git

#  Tạo nhanh file .env chứa các khóa bảo mật cần thiết
cat <<EOT > .env
JWT_SECRET=marketplace_jwt_secret_2024
INTERNAL_SECRET=internal_service_secret_2024
EOT

#  Khởi động lại các container để nhận cấu hình mới
sudo docker compose -p marketplace down
sudo docker compose -p marketplace up -d
 # hoàn thành