# Website Tĩnh - SOA102 Website

Dự án này chứa mã nguồn HTML/CSS tĩnh của trang web của bạn, được xuất từ WordPress và tối ưu hóa để triển khai (deploy) trực tiếp lên GitHub Pages.

## Các cải tiến đã được thực hiện tự động:
1. **Làm sạch liên kết**: Chuyển đổi toàn bộ các liên kết tuyệt đối (ví dụ: `http://localhost/` hoặc `https://zerongu.zimlewis.cloud/`) thành liên kết tương đối (`./`, `../`, v.v.). Điều này giúp trang web của bạn có thể chạy ổn định ở bất kỳ thư mục con nào trên GitHub Pages hoặc khi mở trực tiếp file `index.html` offline.
2. **Cơ cấu thư mục sạch sẽ**: Đặt toàn bộ các tệp tĩnh vào thư mục chuyên biệt `D:\xammp\htdocs\soa102_website_static` thay vì để lộn xộn ngoài ổ đĩa `D:\`.

## Hướng dẫn deploy lên GitHub Pages

Vui lòng mở PowerShell hoặc Git Bash và thực hiện các bước sau:

### Bước 1: Khởi tạo Git repository trong thư mục này
```bash
# Di chuyển vào thư mục code tĩnh
cd D:\xammp\htdocs\soa102_website_static

# Khởi tạo git
git init

# Thêm toàn bộ các file
git add .

# Commit lần đầu
git commit -m "Initial commit of static website files"
```

### Bước 2: Liên kết với repo của bạn trên GitHub
1. Tạo một repository mới trên GitHub (Ví dụ đặt tên là: `soa102_website`).
2. Liên kết repo local với GitHub bằng lệnh sau (Thay đổi URL của bạn cho đúng):
```bash
git branch -M main
git remote add origin https://github.com/TÊN_USER_GITHUB/soa102_website.git
git push -u origin main
```

### Bước 3: Bật GitHub Pages
1. Truy cập vào repo của bạn trên trang web GitHub.
2. Vào phần **Settings** -> **Pages**.
3. Tại mục **Build and deployment** -> **Source**, chọn **Deploy from a branch**.
4. Tại mục **Branch**, chọn `main` và thư mục `/ (root)`, sau đó nhấn **Save**.
5. Đợi khoảng 1-2 phút, GitHub sẽ cung cấp link truy cập trang web tĩnh của bạn (ví dụ: `https://TÊN_USER_GITHUB.github.io/soa102_website/`).

---
*Chúc bạn thành công!*
