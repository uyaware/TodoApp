# 📝 Todo Management Application (Intern Developer Test)
Đây là ứng dụng Quản lý công việc (Todo List) được xây dựng phục vụ cho bài test tuyển dụng vị trí Intern Developer. Dự án tập trung vào việc tối ưu hóa chất lượng mã nguồn, tổ chức thư mục khoa học, xử lý dữ liệu chặt chẽ từ Frontend đến Backend và sẵn sàng cho môi trường production.  

## 🌐 Triển khai trực tuyến (Deployment)
`Xin vui lòng đợi 15p để ứng dụng khởi chạy (vì sử dụng Render Free tier nên backend tự đóng sau một khoảng thời gian không có kết nối)`:  
- **Link Ứng dụng (Frontend):** https://todo-nine-green-83.vercel.app/
- **Link API (Backend):** https://todoapp-kqb8.onrender.com/v1/api/todos

## 🚀 Tính năng chính   
- **Xem danh sách:** Hiển thị danh sách công việc trực quan, hỗ trợ responsive hoàn hảo trên mọi thiết bị.  
- **Thêm mới:** Tạo công việc mới đi kèm validation dữ liệu chặt chẽ.  
- **Chỉnh sửa & Xóa:** Cập nhật tiêu đề/nội dung hoặc xóa công việc linh hoạt.  
- **Trạng thái:** Đánh dấu Hoàn thành (Completed) / Chưa hoàn thành (Incomplete).  
- **Bộ lọc & Tìm kiếm:** Tìm kiếm công việc theo từ khóa hoặc lọc nhanh theo trạng thái. 
- **Sắp xếp & Phân trang:** Tối ưu hóa hiệu năng hiển thị khi danh sách công việc lớn.  
- **Validation (Zod):** Kiểm tra và bóc tách dữ liệu không hợp lệ ngay từ Client trước khi gửi lên Server.  
- **Dockerized:** Đóng gói ứng dụng để chạy đồng nhất trên mọi môi trường.  

## 🛠️ Công nghệ sử dụng (Tech Stack)
- **Frontend**
    - Core: React.js   
    - Styling: Tailwind CSS (UI mượt mà, tối ưu Responsive)   
    - Validation: Zod (Đảm bảo an toàn dữ liệu đầu vào)   
- **Backend & Database**
    - Runtime: Node.js & Express.js   
    - Database: MongoDB (Lưu trữ dữ liệu linh hoạt)
    - ODM: Mongoose (Định nghĩa Schema chặt chẽ cho Todo)
    - Validation: Zod (Middleware kiểm tra request body/params)  

## 💻 Hướng dẫn cài đặt và Chạy Local
Để xem chi tiết cách cài đặt môi trường, cấu hình .env cũng như cách build từng phần bằng CLI truyền thống, vui lòng truy cập vào file README.md riêng biệt nằm trong từng thư mục:  
- **Frontend:** [Xem tại thư mục frontend](./frontend/README.md)
- **Backend:** [Xem tại thư mục backend](./backend/README.md)

