## 🚀 Hướng dẫn cài đặt & Chạy ứng dụng local
### 1. Yêu cầu hệ thống
- **Node.js:** Phiên bản v22.x.

- **Backend:** Đảm bảo API Backend đang chạy tại http://localhost:5000/v1/api (hoặc cấu hình lại URL tương ứng).

### 2. Cài đặt các gói phụ thuộc (Dependencies)
Di chuyển vào thư mục dự án và chạy lệnh sau để cài đặt các thư viện cần thiết (lucide-react, sonner, zod...):

```Bash
npm install
```
### 3. Khởi chạy môi trường Phát triển (Development)
Chạy lệnh sau để khởi động ứng dụng ở môi trường local:

```Bash
npm run dev
```
Sau đó, truy cập đường dẫn hiển thị trên terminal http://localhost:5173 để trải nghiệm ứng dụng.

--- 
## API Documentation
Chi tiết các endpoint và cấu trúc dữ liệu được cập nhật tại các file sau:
* [Tài liệu API (Todo Task)](../backend/docs/todo_api.md)