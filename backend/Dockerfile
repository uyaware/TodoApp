# Sử dụng phiên bản Node v22 Alpine siêu nhẹ để tiết kiệm dung lượng lưu trữ trên Render
FROM node:22-alpine

WORKDIR /app

# Chỉ copy package.json và package-lock.json để cài dependencies trước (tận dụng Docker cache)
COPY package*.json ./

# Cài đặt các thư mục trong phần "dependencies", bỏ qua "devDependencies" (như jest, nodemon)
# Điều này giúp image nhẹ hơn rất nhiều và tránh cài thừa các thư viện test
RUN npm ci --only=production

# Copy toàn bộ mã nguồn còn lại (bao gồm server.js, index.js và các folder route/controller của bạn)
COPY . .

# Render yêu cầu chạy app trên môi trường production
ENV NODE_ENV=production

# Render sẽ tự cấp một cổng ngẫu nhiên thông qua biến môi trường $PORT (thường là 10000)
# Bạn hãy đảm bảo trong file server.js có đoạn: const PORT = process.env.PORT || 5000;
ENV PORT=10000
EXPOSE 10000

# Lệnh khởi chạy chính thức thay vì dùng nodemon
CMD ["node", "server.js"]