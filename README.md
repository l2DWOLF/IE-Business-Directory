# 🌐 IE Business Directory

A modern, full-featured **React.js** frontend application for discovering, managing, and interacting with business listings.  
**Now with dynamic backend switching support**, allowing integration with multiple database environments (e.g., development, campus, and production backends) through a simple UI toggle.

---

## 🚀 Overview

**IE Business Directory** enables users to search, browse, and manage digital business cards in a responsive and user-friendly interface.  
Built with React and Redux, it supports **dynamic backend switching**, **role-based access**, real-time updates, and advanced filtering.

> 💡 This repository contains the **frontend only**. It integrates with a Node.js/Express/MongoDB backend.

---

## ✨ Features

### 🔍 Explore & Search
- **Smart search** by title, subtitle, description, contact, etc.
- **Live filtering** with instant results
- **Paginated browsing** with load-more functionality

### 🧾 Business Card Management
- Create, edit, and delete your own business cards
- Visual card layout with like buttons and modal-based editing

### 🔐 Authentication & Role-based Access
- **Public users**: View & search businesses
- **Registered users**: Like cards & manage profile
- **Business users**: Add/edit/delete business cards
- **Admins**: Access the CRM dashboard to manage users

### 🌐 Dynamic Backend Switching
- Easily toggle between multiple API endpoints (e.g., production/campus)
- Backend preference is saved via `sessionStorage`
- Axios dynamically uses the current selected base URL

### 🌗 Light/Dark Mode
- Toggle site theme with one click (via React Context)

---

## 🧰 Tech Stack

| Category           | Tech                                               |
|--------------------|----------------------------------------------------|
| Frontend           | React, React Router, Redux Toolkit, Context API   |
| Forms & Validation | Formik, Yup                                        |
| HTTP Requests      | Axios (with interceptors for dynamic baseURL)     |
| Icons              | Lucide React Icons                                |
| Notifications      | React Toastify                                     |
| Styling            | CSS Modules                                        |

---

**Note**: The backend and database are not included in this repository. To use the application, you will need to integrate it with a Node.js/Express backend that uses MongoDB.

## 🖥️ Live Demo

👉 [Explore the App's Live Demo](https://ie-business-directory.onrender.com/)

---

## 🧑‍💼 User Guide

### 🔐 Register/Login
- Create an account or login to unlock full access.

### 🔎 Browse & Search
- Use the search bar to quickly find businesses by keyword.

### 🧾 Manage Cards
- Access **My Cards** to edit or delete your listings.
- Business users can **Add New Business**.

### 🛠️ CRM Dashboard (Admin only)
- View and manage registered users.
- Navigate to individual user profiles.

### 🌐 API Switcher
- Use the dropdown in the top left to change backend source.
- ⚠️ Switching will log the user out for security and consistency.