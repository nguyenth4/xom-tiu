# Project Handoff: Xóm Tíu E-commerce (Fullstack)

## 1. Project Overview
**Xóm Tíu** là nền tảng thương mại điện tử chuyên cung cấp các sản phẩm Hủ Tiếu truyền thống (Hủ tiếu tươi, khô, combo) với định vị thương hiệu cao cấp, thanh lịch, ấm cúng và mang đậm bản sắc mộc mạc nhưng hiện đại. Dự án hiện tại đã được cấu trúc lại hoàn chỉnh thành 2 phần rõ rệt: Frontend và Backend.

**Tech Stack:**
- **Frontend:** React 18, Vite, TypeScript, CSS Modules (Vanilla CSS), Lucide React, React Router DOM.
- **Backend:** NestJS, TypeScript, Prisma ORM, PostgreSQL.
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
  - **Xác thực (`/login`, `/register`)**: Tích hợp API Auth thực tế qua Prisma.
- **Admin Pages:**
  - **RBAC (Phân quyền):** Đã phân chia rõ 3 quyền: `ADMIN`, `STAFF`, `CUSTOMER`. 
    - `ADMIN`: Toàn quyền quản trị. Có thể thay đổi quyền (Role) cho bất kỳ người dùng nào thông qua trang **Người dùng & Khách hàng**.
    - `STAFF`: Có thể xem/thêm/sửa Sản phẩm, quản lý Danh mục, xem Đơn hàng, nhưng **KHÔNG** thể Xóa sản phẩm, và bị ẩn hoàn toàn trang Khách hàng & Cài đặt.
  - **Quản lý Sản Phẩm (`/admin/products`)**: Hiển thị danh sách, tìm kiếm, lọc theo danh mục, phân quyền nút Xóa.
  - **Chi tiết Đơn Hàng (`/admin/orders/:id`)**: Admin có thể xem chi tiết món ăn, thay đổi trạng thái (Chờ xác nhận, Đang chuẩn bị, Đã giao, Đã hủy). Đã hiển thị đầy đủ thông tin giao hàng, số điện thoại (`phone`) và sửa lỗi hiển thị hình ảnh (`product.image`).

### Backend (NestJS)
- **Database (Prisma + PostgreSQL):** 
  - Lược đồ (Schema) hoàn chỉnh gồm `User`, `Product`, `Category`, `Order`, `OrderItem`, `Article`.
  - Bảng `Order` đã được bổ sung thêm trường `phone` để lưu số điện thoại giao hàng.
  - Enum `Role` đã có `CUSTOMER`, `ADMIN` và `STAFF`.
- **API Services:** Xây dựng đầy đủ các module: Users, Auth, Products, Categories, Orders.
- **Upload API (`/upload`):** Tích hợp Supabase Storage (thay vì local), giúp ảnh có Public URL an toàn, sẵn sàng cho môi trường deploy đám mây.
- **Fix lỗi Deploy Railway:** Đã gỡ bỏ file `create-admin.ts` đặt sai vị trí ở thư mục root của Backend, giúp NestJS build chuẩn cấu trúc ra `dist/main.js` (không bị văng vào `dist/src/main.js`), khắc phục triệt để lỗi sập `500` và `MODULE_NOT_FOUND` trên Railway.

## 3. Architecture & Data Flow
- **Frontend (Vercel):** Khởi chạy React App. Gọi tới backend qua `VITE_API_URL`. Chứa logic kiểm tra Role ở các file Layout để render UI và route phù hợp.
- **Backend (Railway):** Khởi chạy bằng `node dist/main.js`. Dùng Nixpacks tự động build, cấu hình IP `0.0.0.0` và cổng động từ `process.env.PORT`. 
- **Database (Supabase Postgres):** Lưu trữ toàn bộ dữ liệu. `prisma db push` để apply Schema.

## 4. Next Steps (Action Items)
Người tiếp nhận dự án trong phiên tiếp theo cần tập trung vào:

1. **Dashboard Analytics:** Trang chủ Admin (`/admin`) hiện đang trống, cần bổ sung các biểu đồ thống kê doanh thu, số đơn hàng, và người dùng mới.
2. **Payment Gateway (Stripe/VNPay):** Luồng checkout hiện tại mặc định là "COD". Nếu cần thanh toán online, hãy tích hợp SDK của Stripe hoặc VNPay tại bước checkout ở `/cart`.
3. **JWT Authentication & Security:** Hiện tại API Auth trả về token tạm (hoặc lưu mock ở Client). Cần triển khai `PassportJS` và `JWT Strategy` cho NestJS, gắn `@UseGuards(JwtAuthGuard, RolesGuard)` vào các endpoints (Products, Users, Orders) để bảo vệ tuyệt đối dữ liệu backend khỏi request trái phép, thay vì chỉ ẩn UI ở frontend.
4. **SEO Optimization:** Đưa các thẻ `Helmet` meta tags vào frontend để tăng tính tìm kiếm tự nhiên.
