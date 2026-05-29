# Project Handoff: Xóm Tíu E-commerce (Fullstack)

## 1. Project Overview
**Xóm Tíu** là nền tảng thương mại điện tử chuyên cung cấp các sản phẩm Hủ Tiếu truyền thống (Hủ tiếu tươi, khô, combo) với định vị thương hiệu cao cấp, thanh lịch, ấm cúng và mang đậm bản sắc mộc mạc nhưng hiện đại. Dự án hiện tại đã được cấu trúc lại hoàn chỉnh thành 2 phần rõ rệt: Frontend và Backend.

**Tech Stack:**
- **Frontend:** React 18, Vite, TypeScript, CSS Modules (Vanilla CSS), Lucide React, React Router DOM.
- **Backend:** NestJS, TypeScript, Prisma ORM, PostgreSQL.
- **Payment Gateway:** Stripe.
- **Storage:** Local storage cho hình ảnh sản phẩm tải lên (đặt tại `frontend/public/images`).

## 2. Completed Features & State (Fullstack)

### Frontend (Client & Admin)
- **Design System:** Tông màu Beige/Taupe trung tính cao cấp. Header có hiệu ứng glassmorphism. Tối ưu hoàn chỉnh Responsive Mobile Menu. Đã cập nhật Title (`Xóm Tíu`) và Favicon tùy chỉnh (bo góc mềm mại).
- **Client Pages:**
  - **Trang chủ (`/`)**: Hero banner, section sản phẩm nổi bật, section giá trị cốt lõi.
  - **Sản phẩm (`/menu`, `/menu/:id`)**: Tích hợp gọi API lấy danh sách và chi tiết sản phẩm. Cập nhật giao diện phân biệt rõ `shortDescription` và `description`.
  - **Giỏ Hàng (`/cart`)**: Tích hợp với state quản lý đơn hàng. Tính toán tự động các khoản phí.
  - **Xác thực (`/login`, `/register`)**: Kết hợp form với UX toggle mượt mà, tích hợp API Auth nhận và lưu JWT token.
- **Admin Pages:**
  - **Quản lý Sản Phẩm (`/admin/products`)**: Hiển thị danh sách, thêm, sửa, xóa sản phẩm thông qua API thực.
  - **Tính năng Upload Hình Ảnh**: Giao diện Admin đã hỗ trợ tải file ảnh trực tiếp từ máy tính lên server thông qua API `/upload`. Ảnh được hiển thị trọn vẹn (không bị cắt xén) tại form preview nhờ CSS `object-fit: contain`.
- **Thanh toán (Checkout):** Đã tích hợp luồng giao dịch Stripe. Người dùng được chuyển sang trang thanh toán bảo mật của Stripe.

### Backend (NestJS)
- **Database (Prisma + PostgreSQL):** Lược đồ (Schema) hoàn chỉnh gồm `User`, `Product`, `Category`, `Order`, `OrderItem`, `Article`. Cung cấp sẵn script seed dữ liệu mẫu phong phú (`seed-products.js`, `seed.js`).
- **Authentication & RBAC:** Cơ chế mã hóa JWT Token. Xác thực người dùng (Login/Register) và phân quyền bảo vệ các API dành riêng cho Admin (Role-Based Access Control).
- **Payment & Webhook:** Xử lý luồng tạo Stripe Checkout Session, cung cấp endpoint nhận Webhook callback từ Stripe để tự động cập nhật trạng thái đơn hàng (`paid`) ngay sau khi giao dịch thành công.
- **Upload API (`/upload`):** Endpoint xử lý file upload (sử dụng Multer). Hình ảnh upload được lưu trực tiếp vào thư mục `frontend/public/images` và trả về URL tĩnh tương đối (`/images/...`) để frontend đọc trực tiếp.

## 3. Architecture & Data Flow
- **Cấu trúc thư mục độc lập:**
  - `frontend/`: Toàn bộ source code React/Vite. Khởi chạy ở port 5173/5174. Tương tác với Backend qua `src/services/api.ts` (`http://localhost:3000`).
  - `backend/`: Toàn bộ source code NestJS. Khởi chạy ở port 3000. Cung cấp RESTful API và nhận Webhook.
- **Luồng quản lý Hình Ảnh (Image Flow):** Admin chọn ảnh ở Frontend -> Bắn POST API `/upload` -> Backend dùng Multer lưu file vào `frontend/public/images/[chuỗi_ngẫu_nhiên].ext` -> Backend trả về path `/images/...` -> Frontend nhận path, gán vào form data -> Submit API lưu path vào DB.

## 4. Next Steps (Action Items)
Người tiếp nhận dự án (hoặc trong phiên làm việc tiếp theo) cần tập trung vào các hạng mục sau để đưa dự án tới điểm Product-Ready:

1. **Hoàn thiện luồng Giỏ Hàng & Checkout:**
   - Liên kết hoàn toàn Giỏ hàng với giỏ thanh toán Stripe: Truyền chính xác danh sách sản phẩm trong giỏ qua API Checkout thay vì payload test.
   - Xây dựng hoàn chỉnh trang Success & Cancel sau khi khách hàng thanh toán xong từ Stripe trả về.

2. **Quản lý Admin bổ sung:**
   - Xây dựng module quản lý Đơn Hàng (Orders) để Admin theo dõi luồng giao hàng, chuyển trạng thái (Ví dụ: `Đang chuẩn bị`, `Đã giao`).
   - Mở rộng giao diện UI cho việc quản lý User và Danh mục (Categories).

3. **Cải thiện hệ thống & DevOps:**
   - Cải thiện SEO (Dynamic Meta tags cho các trang chi tiết sản phẩm).
   - Thiết lập môi trường Production (Environment Variables cho DB, Stripe Secret, CORS config).
   - Chuẩn bị Dockerfile và cấu hình CI/CD phục vụ việc deploy lên VPS/Cloud.
