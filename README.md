# ✨ Blogify — Write, Share, Connect

[![Live Site](https://img.shields.io/badge/Live_Site-Online-brightgreen?style=for-the-badge&logo=Firebase)](https://assignment-11-client-32ff9.web.app/)
[![Client Repo](https://img.shields.io/badge/Client_GitHub-Open-blue?style=for-the-badge&logo=GitHub)](https://github.com/your-client-repo)
[![Server Repo](https://img.shields.io/badge/Server_GitHub-Open-black?style=for-the-badge&logo=GitHub)](https://github.com/your-server-repo)

> A full-featured, responsive blog platform built using **React**, **Firebase**, **MongoDB**, and **TailwindCSS** – designed for modern content creators, readers, and recruiters alike.

---

## 📌 Project Overview

**Blogify** is a visually polished, full-stack blog application that lets users **write**, **share**, and **interact** with blog content in a secure and intuitive environment.

It empowers creators to publish content, readers to discover posts, and developers to explore cutting-edge frontend/backend integrations.

---

## 🌟 Key Features

| Feature                       | Description                                                             |
| ----------------------------- | ----------------------------------------------------------------------- |
| 🔐 **Secure Auth System**     | Email/password + Google login with Firebase Auth & JWT-secured routes   |
| 📝 **Blog CRUD**              | Add, view, update (conditional), delete blogs with category & content   |
| 💬 **Interactive Comments**   | Authenticated users can comment (except their own blogs)                |
| 💖 **Personal Wishlist**      | Save favorite blogs, manage from a private wishlist dashboard           |
| 📊 **Top Blogs Table**        | Sortable featured table of most content-rich blogs using TanStack Table |
| 🔍 **Smart Search & Filters** | MongoDB text search + category filter on the All Blogs page             |
| ✨ **Modern UI/UX**           | Framer Motion + Intersection Observer + responsive Tailwind design      |
| 📩 **Newsletter Toast**       | Interactive newsletter section with confirmation toast                  |
| 🧠 **Developer Optimized**    | Clean project structure, reusable components, and RESTful API           |

---

## 🔧 Technologies Used

### 🧱 Frontend

- **React 19**
- **React Router v7**
- **Tailwind CSS 4.1**
- **Framer Motion**
- **React Simple Typewriter**
- **Swiper**, **React Icons**, **React Tooltip**
- **Lottie**, **React Intersection Observer**
- **React Toastify**, **SweetAlert2**
- **React Photo View**

### 🔐 Authentication & Security

- **Firebase Authentication**
- **JWT Token Handling (Client Cookies)**
- **Protected Routes**
- **Secure ENV Setup**

### 🧠 Backend

- **Node.js + Express**
- **MongoDB Atlas**
  - Blogs Collection
  - Comments Collection
  - Wishlist Collection
- **Axios for HTTP Requests**
- **CORS & ENV-Secured MongoDB URI**

### 📈 Advanced UI/UX

- **TanStack React Table** – featured blog sorting
- **Framer Motion** – animated transitions
- **React Intersection Observer** – on-scroll animations
- **React Markdown** – rich text blog rendering

---

## 🗂️ Pages Breakdown

| Page                  | Highlights                                                      |
| --------------------- | --------------------------------------------------------------- |
| 🏠 **Home**           | Hero + Recent Blogs + Tips Section + Newsletter + Framer Motion |
| 🆕 **Add Blog**       | Protected form, category dropdown, validation                   |
| 📚 **All Blogs**      | Full list, search by title, filter by category                  |
| 🔍 **Blog Details**   | Full content, comment system, conditional update button         |
| ♻️ **Update Blog**    | Prefilled secure edit page for owners                           |
| ⭐ **Featured Blogs** | Top 10 blogs sorted by word count                               |
| 🧡 **Wishlist**       | User-specific blogs with remove and detail actions              |
| 🔐 **Login/Register** | Firebase auth with form validation and Google OAuth             |
| ⚠️ **404 Page**       | Custom not-found route                                          |

---

## 🧪 Data Flow & Logic

- **JWT Authentication**: Firebase issues a token → Server validates & returns a secure custom JWT → Stored in cookies
- **Wishlist & Comments**: Blog `_id` is stored in separate collections to enable scalable filtering
- **Update Button**: Conditional rendering by comparing logged-in user email with blog owner's
- **Protected Routes**: Ensured using route guards + token validation

---

## 🧠 Best Practices Followed

- ✅ **Firebase & MongoDB credentials secured with `.env`**
- ✅ **Responsive design across all screen sizes**
- ✅ **Proper alignment, spacing, and color contrast**
- ✅ **No reload errors on private routes**
- ✅ **Dynamic routing for details/update**
- ✅ **Meaningful commit messages (15+ client, 8+ server)**

---

## 📦 NPM Packages

```json
{
  "@tailwindcss/vite": "^4.1.8",
  "@tanstack/react-query": "^5.80.7",
  "@tanstack/react-table": "^8.21.3",
  "axios": "^1.9.0",
  "firebase": "^11.9.0",
  "framer-motion": "^12.16.0",
  "lottie-react": "^2.4.1",
  "motion": "^12.16.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-icons": "^5.5.0",
  "react-intersection-observer": "^9.16.0",
  "react-markdown": "^10.1.0",
  "react-photo-view": "^1.2.7",
  "react-router": "^7.6.2",
  "react-scroll": "^1.9.3",
  "react-simple-typewriter": "^5.0.1",
  "react-toastify": "^11.0.5",
  "react-tooltip": "^5.28.1",
  "sweetalert2": "^11.22.0",
  "swiper": "^11.2.8",
  "tailwindcss": "^4.1.8"
}
```

👨‍💻 **Made with care and code by Arafat**
