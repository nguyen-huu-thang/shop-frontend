# Web bán hàng (React Frontend)

Đây là phần frontend của dự án web bán hàng, được phát triển bằng React. Dự án gồm 2 phần chính:

- **Frontend**: React, lưu trữ tại [Shop Frontend Repository](https://github.com/nguyen-huu-thang/shop-frontend.git)
- **Backend**: Symfony, lưu trữ tại [Shop Backend Repository](https://github.com/nguyen-huu-thang/shop-backend.git)

---

## Yêu cầu hệ thống

- **Node.js**: Phiên bản `22.11.0` hoặc tương thích.

- **npm**: Được cài đặt kèm Node.js.

---

## Hướng dẫn cài đặt

1. **Clone dự án từ GitHub**:

   ```bash
   git clone https://github.com/Huutkang/shop-frontend.git
   cd shop-frontend
   ```

2. **Cài đặt các thư viện**:

   ```bash
   npm install
   ```

3. **Khởi chạy ứng dụng**:

   ```bash
   npm start
   ```

4. **Truy cập ứng dụng**:
   - Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000).

---

## Quy tắc làm việc nhóm

1. **Làm việc trên nhánh cá nhân**:
   - Mỗi thành viên làm việc trên nhánh của mình (`thang`, `an`, `phuoc`, `trung`).
   - **Không đẩy trực tiếp lên nhánh `main`**.

2. **Pull mã nguồn trước khi làm việc**:
   - Để đảm bảo mã nguồn của bạn luôn cập nhật:

     ```bash
     git pull origin main
     ```

3. **Commit và đẩy lên nhánh cá nhân**:
   - chuyển sang nhánh các nhân nếu bạn ở nhánh khác

      ```bash
      git branch -M <tên_nhánh cá nhân>
      ```

   - Sau khi hoàn thành công việc, hãy commit và đẩy mã lên nhánh của bạn:

     ```bash
     git add .
     git commit -m "Mô tả thay đổi"
     git push origin <tên_nhánh cá nhân>
     ```

4. **Yêu cầu đẩy lên nhánh `main`**:
   - Khi cảm thấy công việc của bạn đã hoàn thiện và ổn định, gửi yêu cầu (Pull Request) để được xem xét và hợp nhất vào nhánh `main`.

---

## Một số lưu ý

1. **Không đẩy thư mục `node_modules` lên GitHub**:
   - Đã có `.gitignore` để loại bỏ thư mục này.

2. **Cài đặt thư viện mới**:
   - Nếu cần cài đặt thư viện mới, hãy chạy:

     ```bash
     npm install <tên_thư_viện>
     ```

   - Sau đó, commit thay đổi trong file `package.json` và `package-lock.json`.

3. **Liên hệ**:
   - Nếu gặp vấn đề, liên hệ **Hữu Thắng** hoặc các thành viên khác để được hỗ trợ.
