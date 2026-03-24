# 🚀 CareerCanvas - Trợ lý Ứng tuyển & Quản lý Công việc Thông minh

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

**Hệ thống ATS (Applicant Tracking System) cá nhân giúp quản lý quá trình xin việc một cách thông minh và hiệu quả**

[Giới thiệu](#-giới-thiệu) • [Tính năng](#-tính-năng) • [Tech Stack](#-tech-stack) • [Cài đặt](#-cài-đặt) • [Cấu trúc dự án](#-cấu-trúc-dự-án)

</div>

---

## 📖 Giới thiệu

**CareerCanvas** không chỉ là một danh sách việc làm đơn giản. Dự án này tập trung trình diễn kiến trúc Frontend Doanh nghiệp (Clean Architecture 3 lớp). Để phục vụ việc demo luồng dữ liệu CRUD trực quan, tầng Backend được mô phỏng nhanh thông qua MockAPI. Đây là một hệ thống **ATS (Applicant Tracking System) cá nhân** được thiết kế để giúp bạn:

- ✅ Quản lý toàn bộ quá trình ứng tuyển từ khi tìm việc đến khi nhận offer
- ✅ Tổ chức công việc theo dạng Kanban Board với tính năng kéo thả
- ✅ Sử dụng AI để tự động viết Cover Letter chuyên nghiệp
- ✅ Theo dõi tiến độ ứng tuyển một cách trực quan

### Tại sao chọn CareerCanvas?

- 🎯 **Tính thực tế**: Giải quyết vấn đề thực tế cho cả người tìm việc và nhà tuyển dụng
- 🏗️ **Kiến trúc rõ ràng**: Áp dụng mô hình 3 lớp chuẩn (UI → Controller Hook → Server Action BFF → External API)
- ✨ **Điểm sáng tạo**: Kanban Board + AI Assistant tạo nên trải nghiệm khác biệt
- 📚 **Học tập**: Dự án hoàn hảo để học và thực hành các công nghệ hiện đại

---

## ✨ Tính năng

### 🎨 Kanban Board
- Quản lý công việc theo dạng bảng Kanban với các cột trạng thái
- Kéo thả công việc giữa các trạng thái (Applied → Interviewed → Offered/Rejected)
- Giao diện trực quan, dễ sử dụng như Trello

### 🤖 AI Assistant
- Tự động viết Cover Letter dựa trên mô tả công việc
- Sử dụng Google Gemini API (miễn phí)
- Tiết kiệm thời gian và tăng hiệu quả ứng tuyển

### 📊 Quản lý Công việc
- Thêm, sửa, xóa thông tin công việc
- Tìm kiếm và lọc công việc
- Theo dõi ngày ứng tuyển, lương, mô tả chi tiết

### 💾 Lưu trữ dữ liệu
- Sử dụng MockAPI.io để lưu trữ dữ liệu
- Không mất dữ liệu khi refresh trang (khác với JSONPlaceholder)
- Hỗ trợ đầy đủ các thao tác CRUD

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14** (App Router) - Framework React với SSR và routing mạnh mẽ
- **TypeScript** (Strict mode) - Type safety và developer experience tốt hơn
- **React 19** - UI library hiện đại

### State Management & Data Fetching
- **SWR** - Data fetching với caching thông minh
- **Axios** - HTTP client để gọi API

### Form Management
- **React Hook Form** - Quản lý form hiệu quả với ít re-render
- **Yup** - Validation schema cho form

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/UI** - Component library đẹp chuẩn doanh nghiệp

### Backend & AI
- **MockAPI.io** - Mock backend API miễn phí, hỗ trợ CRUD đầy đủ
- **Google Gemini API** - AI miễn phí để viết Cover Letter

---

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm hoặc yarn hoặc pnpm

### Bước 1: Clone repository
```bash
git clone <repository-url>
cd career-canvas
```

### Bước 2: Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### Bước 3: Cấu hình môi trường

Tạo file `.env.local` trong thư mục root:

```env
# MockAPI Base URL
NEXT_PUBLIC_API_BASE_URL=https://your-mockapi-id.mockapi.io/api/v1

# Google Gemini API (Optional - chỉ cần khi sử dụng AI Assistant)
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

### Bước 4: Chạy ứng dụng

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

---

## 📁 Cấu trúc dự án

```
career-canvas/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx             # Trang chủ
│   │   ├── layout.tsx           # Layout chính
│   │   ├── globals.css          # Global styles
│   │   └── jobs/                # Route jobs
│   │       └── page.tsx         # Trang quản lý jobs
│   │
│   ├── application/             # Layer: Server Action BFF
│   │   ├── api/                 # API functions
│   │   │   └── job.ts          # Job API endpoints
│   │   └── controllerApi/       # API transport layer
│   │       └── transportByAxios.ts
│   │
│   ├── controllerApi/           # Layer: Controller Hooks
│   │   └── useApi/
│   │       └── job/
│   │           └── useJob.ts   # Custom hooks cho Job
│   │
│   ├── components/              # UI Components
│   │
│   └── types/                   # TypeScript types
│       └── job.ts              # Job interface & types
│
├── public/                      # Static files
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

### 🏗️ Kiến trúc 3 lớp

Dự án áp dụng kiến trúc 3 lớp rõ ràng:

```
┌─────────────────────────────────────┐
│           UI Layer                  │
│  (React Components, Pages)          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Controller Hook Layer          │
│  (Custom Hooks: useJob, etc.)       │
│  - useSWR for data fetching         │
│  - State management                 │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Server Action BFF Layer        │
│  (API Functions: job.ts)            │
│  - Data transformation              │
│  - Error handling                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│        External API Layer           │
│  (MockAPI.io, Gemini API)           │
└─────────────────────────────────────┘
```

---

## 🚀 Hướng dẫn sử dụng

### 1. Quản lý công việc

- **Xem danh sách**: Truy cập `/jobs` để xem tất cả công việc đã lưu
- **Thêm mới**: Click nút "Thêm công việc" và điền thông tin
- **Cập nhật**: Click vào công việc để chỉnh sửa
- **Xóa**: Chọn công việc và xóa

### 2. Sử dụng Kanban Board

- Kéo thả công việc giữa các cột trạng thái:
  - **Applied** - Đã ứng tuyển
  - **Interviewed** - Đã phỏng vấn
  - **Offered** - Đã nhận offer
  - **Rejected** - Đã bị từ chối

### 3. AI Assistant - Viết Cover Letter

- Chọn một công việc
- Click nút "Viết Cover Letter bằng AI"
- AI sẽ tự động tạo Cover Letter dựa trên:
  - Mô tả công việc
  - Thông tin công ty
  - Vị trí ứng tuyển

---

## 📝 Scripts

```bash
# Development
npm run dev          # Chạy development server

# Production
npm run build        # Build ứng dụng
npm run start        # Chạy production server

# Linting
npm run lint         # Kiểm tra code với ESLint
```

---

## 🔧 Cấu hình

### MockAPI.io Setup

1. Truy cập [MockAPI.io](https://mockapi.io/)
2. Tạo project mới
3. Tạo resource tên `jobs` với các field:
   - `id` (string, auto)
   - `company` (string)
   - `position` (string)
   - `status` (string)
   - `salary` (string)
   - `description` (string)
   - `appliedDate` (string)

4. Copy API URL vào `.env.local`:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-id.mockapi.io/api/v1
   ```

### Google Gemini API Setup (Optional)

1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Tạo API key miễn phí
3. Thêm vào `.env.local`:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your-api-key
   ```

---

## 🎯 Roadmap

- [ ] Thêm tính năng export CV/Resume
- [ ] Thêm calendar view để theo dõi lịch phỏng vấn
- [ ] Thêm thống kê và analytics
- [ ] Tích hợp thêm các job board (LinkedIn, Indeed)
- [ ] Thêm dark mode
- [ ] Thêm nhiều ngôn ngữ (i18n)

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy:

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📄 License

Dự án này được phát hành dưới MIT License.

---

## 👨‍💻 Tác giả

Được xây dựng với ❤️ để giúp quản lý quá trình tìm việc hiệu quả hơn.

---

<div align="center">

**⭐ Nếu dự án này hữu ích, hãy cho một star! ⭐**

</div>
