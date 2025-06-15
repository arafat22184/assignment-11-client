# ✍️ Blogify — Your Personal Blogging Platform

[![Live Site](https://img.shields.io/badge/Live_Site-Blogify-green?style=flat-square&logo=Firebase)](https://assignment-11-client-32ff9.web.app/)
[![React](https://img.shields.io/badge/React-19.1-blue?logo=react)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-11.9-orange?logo=firebase)](https://firebase.google.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Server-green?logo=mongodb)](https://www.mongodb.com/)
[![Status](https://img.shields.io/badge/Status-Deployed-success)](https://assignment-11-client-32ff9.web.app/)

---

## 📸 Preview

> Here's a glimpse of what you'll experience on **Blogify**:

![Home Page](https://i.ibb.co/mrwt2Lfn/1.png)
![Recent Blogs](https://i.ibb.co/mCWXKRcF/2.png)
![Blog Details](https://i.ibb.co/0jgRDFJ6/3.png)
![Wishlist Page](https://i.ibb.co/pvQYcSRT/4.png)
![Featured Blogs Table](https://i.ibb.co/NdRLzKj6/5.png)

---

## 🌐 Live Demo

**Client:** [https://assignment-11-client-32ff9.web.app/](https://assignment-11-client-32ff9.web.app/)  
**Server:** [https://assignment-11-server-lime-zeta.vercel.app/](https://assignment-11-server-lime-zeta.vercel.app/)

---

## 🎯 Project Purpose

**Blogify** is a full-featured blogging platform built to provide a clean, responsive, and secure space where users can create, manage, and explore blogs. Featuring authentication, CRUD operations, protected routes, wishlists, featured posts, and smart filtering – this project was developed to meet the Assignment-11 challenge.

---

## 🚀 Key Features

- 🔐 **JWT-Protected Authentication**
  - Firebase Email/Password login & Google Sign-In
  - Private Routes protected with JWT validation
- 📝 **Blog Management**
  - Add, update, and delete your own blogs
  - Auto-filled update forms
- 🧠 **Smart UI & Animations**
  - Framer Motion and Lottie integration
  - Intersection Observer for engaging scroll animations
- 📚 **Blog Features**
  - Dynamic search, filter by category, and markdown-rendered content
  - Wishlist support with server-side filtering
- 📈 **Featured Blogs Table**
  - TanStack Table with sortable columns
  - Ranks blogs by word count in long descriptions
- 💬 **Comment System**
  - Users can comment on others' blogs (not their own)
  - Display of commenter’s name & profile picture
- 📥 **Newsletter Toast**
  - Email input with toast feedback — no actual email sending
- 🧼 **Clean UI**
  - Mobile-first responsive design with TailwindCSS and React Icons

---

## 📁 Folder Structure

```bash
client/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── provider/
│   └── utils/
server/
├── routes/
├── controllers/
├── models/
├── middlewares/
└── index.js
```
