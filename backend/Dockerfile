# --- STAGE 1: Build ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy các file quản lý dependency
COPY package*.json ./
COPY prisma ./prisma/

# Cài đặt toàn bộ dependencies (bao gồm devDependencies để có thể build)
RUN npm ci

# Copy toàn bộ mã nguồn
COPY . .

# Sinh Prisma Client
RUN npx prisma generate

# Build ứng dụng NestJS (tạo ra thư mục dist)
RUN npm run build


# --- STAGE 2: Production ---
FROM node:22-alpine

WORKDIR /app

# Copy các file cấu hình
COPY package*.json ./
COPY prisma ./prisma/

# Chỉ cài đặt production dependencies để giảm kích thước image
RUN npm ci --omit=dev

# Sinh lại Prisma Client trong môi trường production
RUN npx prisma generate

# Copy thư mục dist đã được build từ stage builder
COPY --from=builder /app/dist ./dist

# Mở port 3000
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["node", "dist/main.js"]
