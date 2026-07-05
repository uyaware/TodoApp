# 📑 API DOCUMENTATION
**Base URL:** http://localhost:5000/v1/api

## 1. Lấy danh sách công việc (Todo List)
- **Endpoint:** `GET /todos`
- **Query Parameters:**
    - search (string, optional): Tìm kiếm gần đúng theo tiêu đề công việc.
    - isCompleted (boolean, optional): Lọc theo trạng thái true (đã hoàn thành) hoặc false (chưa hoàn thành).
    - page (number, optional): Phân trang.
    - limit (number, optional): Số lượng tasks mỗi trang.
- **Response (200 OK):**
```JSON
{
    "message": "Lấy danh sách công việc thành công",
    "statusCode": 200,
    "metadata": {
        "data": [
            {
                "title": "Finish the test 2",
                "description": "In 2 days",
                "isCompleted": false,
                "createdAt": "2026-07-05T13:28:23.037Z",
                "updatedAt": "2026-07-05T13:28:23.037Z",
                "id": "6a4a5bf78d879b0a3043f7a2"
            }
        ],
        "pagination": {
            "totalItems": 1,
            "totalPages": 1,
            "currentPage": 1,
            "limit": 10
        }
    }
}
```

## 2. Thêm công việc mới
- **Endpoint:** `POST /todos`

- **Body (JSON):**

```JSON
{
  "title": "Học kiến trúc hệ thống",
  "description": "Đọc tài liệu về Repository Pattern"
}
```
- **Response (201 Created):**

```JSON
{
    "message": "Tạo công việc mới thành công",
    "statusCode": 201,
    "metadata": {
        "title": "Delete this task",
        "description": "Delete immediately",
        "isCompleted": false,
        "createdAt": "2026-07-05T14:43:47.457Z",
        "updatedAt": "2026-07-05T14:43:47.457Z",
        "id": "6a4a6da3252981ad136ba2fb"
    }
}
```
- **Error Response (400 Bad Request - Thiếu title hoặc dữ liệu sai định dạng):**

```JSON
{
    "status": "error",
    "code": 400,
    "message": "Định dạng không đúng"
}
```

## 3. Chỉnh sửa công việc / Đánh dấu trạng thái
- **Endpoint:** `PUT /todos/:id`

- **Body (JSON):** (Truyền các trường cần cập nhật, không bắt buộc truyền hết)

```JSON
{
  "isCompleted": true
}
```

- **Response (200 OK):**

```JSON
{
    "message": "Cập nhật công việc thành công",
    "statusCode": 200,
    "metadata": {
        "title": "Delete this task",
        "description": "well well well",
        "isCompleted": true,
        "createdAt": "2026-07-05T14:43:04.535Z",
        "updatedAt": "2026-07-05T14:46:23.151Z",
        "id": "6a4a6d78252981ad136ba2fa"
    }
}
```
- **Error Response (400 Bad Request - Dữ liệu cập nhật sai định dạng Zod):**

```JSON
{
  "status": "error",
  "code": 400,
  "message": "Định dạng không đúng"
}
```

- **Error Response (404 Not Found - Không tìm thấy ID công việc):**

```JSON
{
    "status": "error",
    "code": 404,
    "message": "Không tìm thấy công việc để chỉnh sửa"
}
```
## 4. Xóa công việc
- **Endpoint:** `DELETE /todos/:id`

- **Response (204 NO CONTENT)**

- **Error Response (404 Not Found - Không tìm thấy ID công việc):**

```JSON
{
  "status": "error",
  "code": 404,
  "message": "Không tìm thấy công việc để xóa"
}
```