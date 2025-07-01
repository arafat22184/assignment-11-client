# ✨ Blogify — Write, Share, Connect

> A full-featured, responsive blog platform built using **React**, **Firebase**, **MongoDB**, and **TailwindCSS** – designed for modern content creators, readers, and recruiters alike.

---

## 📸 Preview

> Here's a glimpse of what you'll experience on **Blogify**:

![Preview 1](https://i.ibb.co/mrwt2Lfn/1.png)
![Preview 2](https://i.ibb.co/mCWXKRcF/2.png)
![Preview 3](https://i.ibb.co/0jgRDFJ6/3.png)
![Preview 4](https://i.ibb.co/pvQYcSRT/4.png)
![Preview 5](https://i.ibb.co/NdRLzKj6/5.png)

---

## 🌐 Live Demo

- **Client:** [Blogify Client](https://assignment-11-client-32ff9.web.app/)
- **Server:** [Blogify Server](http://localhost:3000/)

---

## 📌 Project Overview

**Blogify** is a visually polished, full-stack blog application that lets users **write**, **share**, and **interact** with blog content in a secure and intuitive environment. It empowers creators to publish content, readers to discover posts, and developers to explore cutting-edge frontend/backend integrations.

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

- **React 19**, **React Router v7**
- **TailwindCSS 4.1**, **Framer Motion**, **React Icons**
- **Swiper**, **Lottie**, **React Tooltip**, **React Markdown**
- **React Intersection Observer**, **React Toastify**, **SweetAlert2**
- **React Photo View**, **React Simple Typewriter**, **React Scroll**

### 🔐 Authentication & Security

- **Firebase Authentication**, **Google OAuth**
- **JWT Token Handling** (client-side cookie storage)
- **Protected Routes** using Firebase & Express
- **.env-secured credentials** for Firebase and MongoDB

### 🧠 Backend

- **Node.js + Express**, **MongoDB Atlas**
- RESTful API with collections for blogs, comments, wishlists
- **CORS Enabled**, **Axios** for HTTP requests

### 📈 Advanced UI/UX

- **TanStack Table** for featured blogs
- **Framer Motion** + **Lottie** animations
- **React Markdown** for blog rendering

---

## 🗂️ Pages Breakdown

| Page                  | Highlights                                                |
| --------------------- | --------------------------------------------------------- |
| 🏠 **Home**           | Hero, Recent Blogs, Newsletter section, motion animations |
| 🆕 **Add Blog**       | Protected form with category dropdown                     |
| 📚 **All Blogs**      | Filter, search, wishlist toggle                           |
| 🔍 **Blog Details**   | Markdown content, comments, update for owners only        |
| ♻️ **Update Blog**    | Prefilled secure form for blog owners                     |
| ⭐ **Featured Blogs** | Top 10 blogs sorted by word count                         |
| 🧡 **Wishlist**       | Personal wishlist with blog details/removal               |
| 🔐 **Login/Register** | Firebase Auth with validation & Google sign-in            |
| ⚠️ **404 Page**       | Friendly not-found route                                  |

---

## 🔁 Data Flow & Logic

- 🔐 **JWT Auth Flow**: Firebase → Server verifies token
- 💬 **Comment System**: Only other users can comment on a blog (not owner)
- 🧠 **Smart Features**:
  - Wishlist stores blog `_id`
  - Featured list sorted by long description length
  - Update page shows only to logged-in owner

---

## ✅ Best Practices

- ✅ ENV-secured credentials (Firebase & MongoDB)
- ✅ Fully responsive mobile-first UI
- ✅ Error boundaries & 404 support
- ✅ No reload errors on private routes
- ✅ Minimal, reusable, and clean component structure

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
