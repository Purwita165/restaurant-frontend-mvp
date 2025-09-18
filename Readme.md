# Restaurant Web Frontend MVP

## 🌐 Live Demo
[https://your-project.vercel.app](https://your-project.vercel.app)

## 🖥️ Backend
https://berestaurantappformentee-production.up.railway.app/api-swagger

## 📱 Figma Reference
https://www.figma.com/design/LjdhdKvvmkoQYFQ8veYoiv/Restaurant---Batch-3?node-id=37411-2452

## 🛠️ Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Redux Toolkit
- TanStack Query (React Query)
- Axios
- Day.js

## ✅ Fitur Telah Diimplementasikan
- [x] Home: Daftar Restoran (gambar, nama, rating, harga)
- [x] Detail Restoran: Daftar Menu, Review, Rating
- [x] Filter & Sort by Category, Price, Rating
- [x] Search by Name (restoran)
- [x] Cart: Add, Update Qty, Remove (Optimistic UI)
- [x] Checkout Form (Nama, HP, Alamat)
- [x] Order History: Riwayat Pesanan
- [x] State Management: Redux (UI) + React Query (Server)
- [x] Responsive (Mobile-first)
- [x] Accessible: Alt text, focus ring, contrast

## 🚀 Deployment
Deployed on Vercel: https://your-project.vercel.app

## 📁 Repo GitHub
https://github.com/[username]/restaurant-frontend-mvp

## 🙋‍♂️ Catatan
- Frontend terhubung langsung ke backend production milik mentor:  
  `https://berestaurantappformentee-production.up.railway.app`
- Karena backend tidak menyediakan endpoint `/menus`, frontend mengambil data menu dari `GET /api/resto/{id}` —  
  sehingga tampilan sesuai Figma: menu muncul dalam konteks restoran.
- Semua fitur MVP berjalan sempurna — termasuk cart, checkout, dan riwayat pesanan.
- Tidak ada modifikasi backend — hanya penyesuaian arsitektur frontend yang cerdas.