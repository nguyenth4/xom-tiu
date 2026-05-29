# Xóm Tíu E-commerce

Nền tảng thương mại điện tử chuyên cung cấp các sản phẩm Hủ Tiếu truyền thống (Hủ tiếu tươi, khô, combo) với định vị thương hiệu cao cấp.

Dự án được chia thành 2 phần: **Frontend** (React + Vite) và **Backend** (NestJS).

---

## Yêu cầu hệ thống (Prerequisites)
- **Node.js** (Khuyến nghị phiên bản 18.x trở lên)
- **PostgreSQL** (Dùng cho cơ sở dữ liệu)
- **npm** (hoặc yarn, pnpm)

---

## 1. Hướng dẫn chạy Backend (NestJS)

Mã nguồn Backend nằm trong thư mục `backend/`.

**Bước 1:** Di chuyển vào thư mục backend
```bash
cd backend
```

**Bước 2:** Cài đặt các packages phụ thuộc
```bash
npm install
```

**Bước 3:** Cấu hình biến môi trường
Tạo file `.env` (nếu chưa có) và thiết lập các biến môi trường cần thiết như:
- `DATABASE_URL` (kết nối PostgreSQL)
- Thông tin cấu hình Stripe (Secret key, Webhook secret)
- JWT Secret

**Bước 4:** Khởi tạo Database (Prisma)
Đồng bộ schema và tạo database:
```bash
npx prisma generate
npx prisma db push
```
*(Tuỳ chọn: Bạn có thể chạy các script seed như `seed.js` hoặc `seed-products.js` để tạo dữ liệu mẫu).*

**Bước 5:** Khởi chạy server Backend
```bash
# Chạy ở chế độ phát triển (Watch mode)
npm run start:dev
```
Backend mặc định sẽ khởi chạy và lắng nghe tại port **3000** (`http://localhost:3000`).

---

## 2. Hướng dẫn chạy Frontend (React + Vite)

Mã nguồn Frontend nằm trong thư mục `frontend/`.

**Bước 1:** Mở một terminal mới và di chuyển vào thư mục frontend (từ thư mục gốc)
```bash
cd frontend
```

**Bước 2:** Cài đặt các packages phụ thuộc
```bash
npm install
```

**Bước 3:** Khởi chạy server Frontend
```bash
# Chạy ở chế độ phát triển
npm run dev
```
Frontend mặc định sẽ khởi chạy tại port **5173** hoặc **5174** (`http://localhost:5173`).

*(Lưu ý: Frontend đã được cấu hình sẵn gọi API tới `http://localhost:3000` qua thư mục `src/services/api.ts`).*

---

## 3. Lưu ý về tính năng Upload Hình Ảnh

Khi upload hình ảnh từ trang Admin (Frontend), Backend sẽ nhận file qua endpoint `/upload` và tự động lưu trực tiếp file ảnh vào thư mục `frontend/public/images/`.
Do đó, hãy đảm bảo thư mục `frontend/public/images/` luôn tồn tại trong quá trình chạy ứng dụng để hình ảnh hiển thị bình thường.
