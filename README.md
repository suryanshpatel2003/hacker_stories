# 🚀 Hacker News Full Stack App (DACBY Assignment)

A full-stack MERN application that fetches top stories from Hacker News, allows users to authenticate, and bookmark their favorite stories.

---

## 📌 Features

### 🔐 Authentication

* User Registration & Login (JWT based)
* Protected routes

### 📰 Stories

* Fetch top 10 stories from Hacker News API
* Display title, points, author, and posted time
* Open story link in new tab

### ⭐ Bookmark System

* Bookmark / Unbookmark stories
* Persistent storage in MongoDB
* Dedicated "My Bookmarks" page

### 🔄 Auto Refresh

* Stories auto-refresh every 10 minutes (cron job)
* Manual refresh button available in UI

### 🎨 UI/UX

* Clean modern UI with Tailwind CSS
* Responsive design
* Loading states & animations

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Axios
* Context API
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* JWT Authentication
* bcryptjs
* node-cron

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/dacby-assignment.git
cd dacby-assignment
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Stories

* `GET /api/stories`
* `GET /api/stories/:id`
* `POST /api/stories/:id/bookmark`
* `GET /api/stories/bookmarks`
* `POST /api/stories/scrape`

---

## 🧠 Architecture Overview

* Backend fetches data from Hacker News API
* Stores stories in MongoDB
* Uses JWT for authentication
* Frontend consumes APIs using Axios
* Bookmark system uses user-story relation

---

## 📦 Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## 🎥 Loom Video

(Explain project architecture, features, and code walkthrough here)

---

## 📌 Future Improvements

* Pagination support
* Search & filters
* Bookmark sync indicator
* Better error handling
* Dark mode

---

## 👨‍💻 Author

Suryansh

---

## ⭐ Notes

This project was built as part of a full-stack developer assignment and demonstrates real-world MERN stack implementation.
