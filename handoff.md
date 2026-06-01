# Project Handoff: Xóm Tíu E-commerce (Fullstack)

## 1. Project Overview
**Xóm Tíu** là nền tảng thương mại điện tử chuyên cung cấp các sản phẩm Hủ Tiếu truyền thống (Hủ tiếu tươi, khô, combo) với định vị thương hiệu cao cấp, thanh lịch, ấm cúng và mang đậm bản sắc mộc mạc nhưng hiện đại. Dự án hiện tại đã được cấu trúc lại hoàn chỉnh thành 2 phần rõ rệt: Frontend và Backend.

**Tech Stack:**
- **Frontend:** React 18, Vite, TypeScript, CSS Modules (Vanilla CSS), Lucide React, React Router DOM, Recharts (vẽ biểu đồ).
- **Backend:** NestJS, TypeScript, Prisma ORM, PostgreSQL, PassportJS (JWT Auth).
- **Storage:** Supabase Storage cho hình ảnh sản phẩm tải lên.
- **Deployment:** Vercel (Frontend) & Railway (Backend).

## 2. Completed Features & State (Fullstack)

### Frontend (Client & Admin)
- **Design System:** Tông màu Beige/Taupe trung tính cao cấp. Header có hiệu ứng glassmorphism. Tối ưu hoàn chỉnh Responsive Mobile Menu. Đã cập nhật Title (`Xóm Tíu`) và Favicon tùy chỉnh (bo góc mềm mại). Nút "Trang Quản trị" trên topbar dành cho Admin được làm nổi bật với màu vàng gold.
- **Client Pages:**
  - **Trang chủ (`/`)**: Hero banner, section sản phẩm nổi bật, section giá trị cốt lõi. Cấu trúc UI được tinh gọn tối giản, giữ lại các phần quan trọng nhất.
  - **Sản phẩm (`/menu`, `/menu/:id`)**: Tích hợp gọi API thực tế.
  - **Trang phụ (`/feed`, `/activities`, `/customer-service`)**: Giao diện đồng bộ với tông màu chủ đạo.
  - **Giỏ Hàng & Checkout (`/cart`)**: Người dùng đăng nhập có thể nhập thông tin (địa chỉ, số điện thoại) và tiến hành Thanh toán. Sau khi đặt hàng thành công sẽ chuyển sang trang `Success`. Đơn hàng được đẩy trực tiếp vào Backend qua API `/orders`. (Lưu ý: Admin không được phép đặt hàng).
- **Admin Pages:**
  - **Dashboard Analytics (`/admin`)**: Đã hoàn thiện giao diện tổng quan hệ thống, hiển thị các thẻ thống kê trực quan (Tổng doanh thu, Tổng đơn hàng, Lượng khách hàng) và tích hợp thư viện `Recharts` để vẽ biểu đồ thanh (Bar Chart) doanh thu trong 7 ngày gần nhất từ API thực.
  - **RBAC (Phân quyền):** Đã phân chia rõ 3 quyền: `ADMIN`, `STAFF`, `CUSTOMER`. 
    - `ADMIN`: Toàn quyền quản trị. Có thể thay đổi quyền (Role) cho bất kỳ người dùng nào thông qua trang **Người dùng & Khách hàng**.
    - `STAFF`: Có thể xem/thêm/sửa Sản phẩm, quản lý Danh mục, xem Đơn hàng, nhưng **KHÔNG** thể Xóa sản phẩm, và bị ẩn hoàn toàn trang Khách hàng & Cài đặt.
  - **Quản lý Sản Phẩm (`/admin/products`)**: Hiển thị danh sách, tìm kiếm, lọc theo danh mục, phân quyền nút Xóa.
  - **Chi tiết Đơn Hàng (`/admin/orders/:id`)**: Admin có thể xem chi tiết món ăn, thay đổi trạng thái (Chờ xác nhận, Đang chuẩn bị, Đã giao, Đã hủy). Đã hiển thị đầy đủ thông tin giao hàng, số điện thoại (`phone`) và sửa lỗi hiển thị hình ảnh (`product.image`).

### Backend (NestJS)
- **Database (Prisma + PostgreSQL):** 
  - Lược đồ (Schema) hoàn chỉnh gồm `User`, `Product`, `Category`, `Order`, `OrderItem`, `Article`.
  - Bảng `Order` có trường `phone` để lưu số điện thoại giao hàng.
  - Enum `Role` có `CUSTOMER`, `ADMIN` và `STAFF`.
- **JWT Authentication & Security:** 
  - Đã tích hợp hoàn chỉnh `PassportJS` và `@nestjs/jwt`.
  - Khởi tạo `JwtStrategy`, `JwtAuthGuard` và `RolesGuard`.
  - Tất cả các endpoint API nhạy cảm (Quản lý User, sửa/xoá Sản phẩm, update đơn hàng, Analytics) đều được bảo vệ bằng `@UseGuards(JwtAuthGuard, RolesGuard)` và phân quyền cấp API bằng decorator `@Roles('ADMIN', 'STAFF')`.
- **API Services:** Đầy đủ module: Users, Auth, Products, Categories, Orders. Bổ sung endpoint `GET /orders/analytics` phục vụ cho thống kê Dashboard.
- **Upload API (`/upload`):** Tích hợp Supabase Storage (thay vì local), giúp ảnh có Public URL an toàn, sẵn sàng cho môi trường deploy đám mây.
- **Deploy Optimization:** Cấu trúc biên dịch (build) đã được tối ưu để hoạt động hoàn hảo trên Nixpacks (Railway) sau khi xóa các script thừa (`create-admin.ts`), ngăn chặn lỗi `MODULE_NOT_FOUND`.

## 3. Architecture & Data Flow
- **Frontend (Vercel):** Khởi chạy React App. Tự động gửi kèm JWT Token (từ localStorage) vào Header của mọi request thông qua cấu hình `services/api.ts`.
- **Backend (Railway):** Khởi chạy bằng `node dist/main.js`. Dùng Nixpacks tự động build, cấu hình IP `0.0.0.0` và cổng động từ `process.env.PORT`. 
- **Database (Supabase Postgres):** Lưu trữ toàn bộ dữ liệu. Dùng `prisma db push` để apply Schema.

## 4. Next Steps (Action Items)
Dự án đã khá hoàn thiện các tính năng cốt lõi. Người tiếp nhận dự án trong phiên tiếp theo cần tập trung vào:

1. **Payment Gateway (Stripe/VNPay):** Luồng checkout hiện tại mặc định là "COD". Nếu cần thanh toán online, hãy tích hợp SDK của Stripe hoặc VNPay tại bước checkout ở `/cart`.
2. **SEO Optimization:** Đưa các thẻ `Helmet` meta tags vào frontend để tối ưu hóa công cụ tìm kiếm và chia sẻ mạng xã hội.
3. **Email Notification:** (Tùy chọn) Tích hợp NodeMailer hoặc Resend để gửi email xác nhận cho khách hàng mỗi khi đơn hàng được đặt thành công hoặc thay đổi trạng thái.
