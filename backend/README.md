# TODO LIST APP - BACKEND API

Dự án Backend cho ứng dụng Quản lý công việc (Todo List) được xây dựng bằng Node.js, Express.js và MongoDB (Mongoose) và xác thực dữ liệu đầu vào bằng Zod.

## 🚀 Tính năng chính
* Hiển thị danh sách công việc (Hỗ trợ tìm kiếm theo tiêu đề và lọc theo trạng thái hoàn thành).
* Thêm mới, chỉnh sửa chi tiết và xóa công việc.
* Đánh dấu hoàn thành hoặc chưa hoàn thành.
* Xử lý dữ liệu không hợp lệ (Validation) nghiêm ngặt.
* Có sẵn hệ thống Unit Test kiểm thử tự động.

---

## 🛠️ Yêu cầu môi trường (Prerequisites)
* Node.js (Phiên bản v22.x)
* MongoDB (Cục bộ hoặc MongoDB Atlas)

---

## 💻 Hướng dẫn cài đặt và chạy dự án

### 1. Cài đặt các thư viện phụ thuộc
Di chuyển vào thư mục backend và chạy lệnh:
```bash
npm install
```
### 2. Cấu hình biến môi trường (Environment Variables)
Tạo một file .env ở thư mục gốc của backend và cấu hình theo mẫu sau:

```
PORT=5000
MONGODB_URI="mongodb://localhost:27017/todo_db"
```
### 3. Chạy dự án ở chế độ Development (Nodemon tự động reload)
```Bash
npm run dev
```
Server sẽ được vận hành tại địa chỉ: http://localhost:5000

### 4. Chạy Unit Test kiểm thử hệ thống
```Bash
npm run test
```
---

## 📖 Tài liệu API (API Documentation)

Chi tiết các endpoint và cấu trúc dữ liệu được cập nhật tại các file sau:
* [Tài liệu API (Todo Task)](./docs/todo_api.md)

---
## 📁 Cấu trúc mã nguồn
```Plaintext
src/
├── dbs/              # Singleton Class Database (Mongoose)
├── core/             # Định nghĩa các Class Success và Error Response chung
├── helpers/          # Chứa asyncHandler bọc và kiểm soát ngoại lệ ở Route
├── models/           # Định nghĩa các Mongoose Schema cho các thực thể
├── repositories/     # Lớp đảm nhận duy nhất việc truy vấn Database (Class-based)
├── services/         # Nơi xử lý toàn bộ logic nghiệp vụ của ứng dụng (Class-based)
├── controllers/      # Tiếp nhận Request, gọi Validation, Service và đẩy kết quả phản hồi (Class-based)
├── routes/           # Khai báo cấu trúc định tuyến API Endpoints
├── validations/      # Zod schemas, validation
└── app.js            # Khởi tạo và cấu hình ứng dụng Express (Middleware tổng)

server.js             # Chạy dự án
```