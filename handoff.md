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
  - **Trang chủ (`/`)**: Hero banner, section sản phẩm nổi bật, section giá trị cốt lõi. Giao diện được tinh gọn, tối giản (đã loại bỏ các section dư thừa như Gallery, Blog, Testimonials) tập trung vào nhận diện thương hiệu.
  - **Sản phẩm (`/menu`, `/menu/:id`)**: Tích hợp gọi API lấy danh sách và chi tiết sản phẩm. Cập nhật giao diện phân biệt rõ `shortDescription` và `description`.
  - **Trang phụ (`/feed`, `/activities`, `/customer-service`)**: Giao diện đồng bộ hoá với tông màu chủ đạo, các nút điều hướng (quay lại danh sách) được tinh chỉnh chỉn chu.
  - **Giỏ Hàng (`/cart`)**: Tích hợp với state quản lý đơn hàng. Tính toán tự động các khoản phí.
  - **Xác thực (`/login`, `/register`)**: Kết hợp form với UX toggle mượt mà, tích hợp API Auth nhận và lưu JWT token.
- **Mobile Menu**: Giao diện responsive trên điện thoại đã được tinh chỉnh mượt mà. Tích hợp thanh cuộn chống tràn menu và tính năng Dropdown cho danh mục "Tất cả sản phẩm" để trải nghiệm gọn gàng hơn.
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
  - `frontend/`: Toàn bộ source code React/Vite. Khởi chạy ở port 5173/5174. Tương tác với Backend thông qua biến môi trường `import.meta.env.VITE_API_URL`. Đã được **Deploy thành công lên Vercel**. Giao diện đã được tối ưu hóa tốc độ tải với cơ chế In-memory/SessionStorage Caching và hiệu ứng Skeleton Loader mượt mà.
  - `backend/`: Toàn bộ source code NestJS. Đã được **Deploy thành công lên Railway** (cấu hình lắng nghe IP `0.0.0.0`, tự động generate Prisma qua `postinstall` và có sẵn `Dockerfile` chuẩn mực). Yêu cầu kết nối CSDL Supabase PostgreSQL qua 2 biến `DATABASE_URL` và `DIRECT_URL`. Đã bật tính năng CORS hoàn chỉnh.
- **Luồng quản lý Hình Ảnh (Image Flow):** Admin chọn ảnh ở Frontend -> Bắn POST API `/upload` -> Backend dùng Multer lưu file vào `frontend/public/images/[chuỗi_ngẫu_nhiên].ext` -> Backend trả về path `/images/...` -> Frontend nhận path, gán vào form data -> Submit API lưu path vào DB. (Lưu ý: Môi trường deploy thật có thể cần chuyển sang dịch vụ cloud storage thay vì local storage).

## 4. Next Steps (Action Items)
Người tiếp nhận dự án (hoặc trong phiên làm việc tiếp theo) cần tập trung vào các hạng mục sau để đưa dự án tới điểm Product-Ready:

1. **Hoàn thiện luồng Giỏ Hàng & Checkout:**
   - Liên kết hoàn toàn Giỏ hàng với giỏ thanh toán Stripe: Truyền chính xác danh sách sản phẩm trong giỏ qua API Checkout thay vì payload test.
   - Xây dựng hoàn chỉnh trang Success & Cancel sau khi khách hàng thanh toán xong từ Stripe trả về.

2. **Quản lý Admin bổ sung:**
   - Xây dựng module quản lý Đơn Hàng (Orders) để Admin theo dõi luồng giao hàng, chuyển trạng thái (Ví dụ: `Đang chuẩn bị`, `Đã giao`).
   - Mở rộng giao diện UI cho việc quản lý User và Danh mục (Categories).

3. **Cải thiện hệ thống lưu trữ (Cloud Storage):**
   - Tối ưu luồng upload ảnh: Do backend hiện tại đang deploy trên Railway, file ảnh lưu local sẽ bị mất sau mỗi lần redeploy. Cần cấu hình đẩy file lên S3, Cloudinary hoặc Supabase Storage thay vì lưu vào thư mục `frontend/public/images`.
   - Cải thiện SEO (Dynamic Meta tags cho các trang chi tiết sản phẩm).
