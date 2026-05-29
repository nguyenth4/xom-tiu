# Project Handoff: Xóm Tíu E-commerce (Frontend)

## 1. Project Overview
**Xóm Tíu** là nền tảng thương mại điện tử chuyên cung cấp các sản phẩm Hủ Tiếu truyền thống (Hủ tiếu tươi, khô, combo) với định vị thương hiệu cao cấp, thanh lịch, ấm cúng và mang đậm bản sắc mộc mạc nhưng hiện đại.

**Tech Stack:**
- React 18 + Vite
- TypeScript
- CSS Modules (Vanilla CSS)
- Lucide React (Icons)
- React Router DOM (Routing)

## 2. Completed Features & UI/UX State (Client-Side)
Hầu như toàn bộ giao diện phía người dùng (Client-Side) đã được dựng hoàn thiện:

1. **Design System (index.css):**
   - Đổi toàn bộ hệ thống màu sang tông Beige/Taupe trung tính cao cấp (Premium Neutral Tone).
   - `Primary`: `#8B7355` (Beige đậm/Taupe)
   - `Accent`: `#D4B895` (Be vàng)
   - `Background`: `#FDFCF8` (Kem nhạt), `#F4EFEA` (Be nhạt)
   - Giao diện nút bấm (Buttons), thẻ (Cards), nhãn (Badges) đã được đồng bộ với tông màu mới.

2. **Client Layout (`ClientLayout.tsx`):**
   - Header cố định, có hiệu ứng kính mờ (glassmorphism).
   - Đã xử lý hoàn chỉnh logic **Responsive Mobile Menu** (Menu Hamburger) đóng/mở mượt mà.
   - Footer đầy đủ thông tin thương hiệu và liên kết.
   - Các icon User và Cart đã được liên kết đúng với Router.

3. **Danh mục các trang (Pages):**
   - **Home (`/`)**: Hero banner, section giới thiệu 3 sản phẩm nổi bật, section giá trị cốt lõi (sử dụng Lucide Icons).
   - **Thực Đơn (`/menu`)**: Hiển thị chính xác 3 sản phẩm (Hủ Tiếu Tươi, Hủ Tiếu Khô, Combo Tươi & Khô). Tích hợp bộ lọc danh mục cơ bản.
   - **Chi Tiết Sản Phẩm (`/menu/:id`)**: Giao diện chi tiết sản phẩm, chọn Topping (checkbox), tăng giảm số lượng, mô tả sản phẩm tùy chỉnh.
   - **Giỏ Hàng (`/cart`)**: 
     - Hiển thị danh sách sản phẩm trong giỏ (mock data).
     - Cho phép tăng/giảm số lượng, xóa món.
     - Khối "Tổng đơn hàng" (Order Summary) tự động tính toán (Tạm tính, Phí ship, Tổng cộng).
     - Xử lý UI báo trống (Empty Cart) khi giỏ hàng không có sản phẩm.
   - **Xác thực (`/login`, `/register`)**:
     - Tạo chung 1 file `Auth.tsx` kết hợp cả form đăng nhập và form đăng ký.
     - UX chuyển đổi trạng thái (Toggle) mượt mà không cần load lại trang.
   - **Về chúng tôi (`/about`) & Liên hệ (`/contact`)**: Đã hoàn thiện giao diện và nội dung.

## 3. Architecture & Data Flow
- **Routing:** Đã setup hoàn chỉnh trong `App.tsx` lồng trong `ClientLayout`.
- **Data (Mocking):** Hiện tại toàn bộ dữ liệu Sản phẩm và Giỏ hàng đang được fix cứng (hardcoded/mock) bên trong các components (`Home.tsx`, `ProductList.tsx`, `ProductDetail.tsx`, `Cart.tsx`).

## 4. Next Steps (Action Items)
Người tiếp nhận dự án (hoặc trong phiên làm việc tiếp theo) cần tập trung vào các công việc sau:

1. **Quản lý State toàn cục (Global State Management):**
   - Áp dụng Zustand, Redux Toolkit hoặc React Context để quản lý trạng thái của **Cart** (thêm vào giỏ từ `ProductDetail` -> hiển thị ở `Cart`) và **Auth** (lưu token đăng nhập).

2. **Tích hợp API (Backend Integration):**
   - Kết nối với backend NestJS đã dựng trước đó.
   - Khởi tạo thư mục `src/services` hoặc sử dụng React Query / RTK Query để call API fetch Products, Categories.
   - Chức năng Auth: Gọi API Login/Register để nhận JWT Token, lưu vào `localStorage`.

3. **Xây dựng tính năng Thanh toán (Checkout):**
   - Tạo trang `/checkout` để điền thông tin giao hàng (Shipping Info) và chọn phương thức thanh toán.
   - Gửi payload đơn hàng (Order) xuống Backend.

4. **Trang cá nhân (User Profile):**
   - Tạo trang xem lịch sử đơn hàng và cập nhật thông tin cá nhân.

## 5. Cấu trúc thư mục hiện hành (Client)
```text
frontend/src/
├── layouts/
│   ├── ClientLayout/
│   └── AdminLayout/
├── pages/
│   ├── client/
│   │   ├── Auth/
│   │   ├── Home/
│   │   ├── ProductList/
│   │   ├── ProductDetail/
│   │   ├── Cart/
│   │   ├── About/
│   │   └── Contact/
│   └── admin/
│       └── Dashboard/
├── App.tsx
└── index.css
```
