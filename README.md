# 🚀 Hacker News Full Stack App (DACBY Assignment)

A production-ready full-stack MERN application that fetches top stories from Hacker News, supports user authentication, and allows bookmarking with persistent storage.

---

## 🌐 Live Repository

👉 https://github.com/suryanshpatel2003/hacker_stories

---

## 📌 Features

### 🔐 Authentication

* User Registration & Login (JWT-based authentication)
* Secure password hashing using bcrypt
* Protected routes for authenticated users

### 📰 Stories

* Fetch top 10 stories from Hacker News API
* Display:

  * Title
  * Points (score)
  * Author
  * Posted time
* Open story links in a new tab

### ⭐ Bookmark System

* Bookmark / Unbookmark stories
* Persistent storage in MongoDB
* Dedicated **"My Bookmarks"** page
* Dynamic UI reflecting bookmark state

### 🔄 Auto Refresh System

* Automatic story refresh every **10 minutes** (via cron job)
* Manual refresh button in UI
* Real-time data sync with backend

### 🎨 UI/UX

* Modern responsive UI using Tailwind CSS
* Clean card-based layout
* Loading states & skeleton UI
* Interactive hover effects
* Mobile-friendly design

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
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* node-cron (for scheduling)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/suryanshpatel2003/hacker_stories.git
cd hacker_stories
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend server:

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

### 🔐 Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

### 📰 Stories

* `GET /api/stories`
* `GET /api/stories/:id`
* `POST /api/stories/:id/bookmark`
* `GET /api/stories/bookmarks`
* `POST /api/stories/scrape`

---

## 🧠 Architecture Overview

* Backend fetches data from Hacker News API
* Stores stories in MongoDB for performance
* JWT used for secure authentication
* Bookmark system implemented using user-story relationships
* Frontend consumes APIs via Axios and manages state using Context API

---

## 📦 Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## 🎥 Loom Video

(Add your Loom walkthrough video link here)

---

## 📌 Future Improvements

* Pagination & infinite scroll
* Search and filtering options
* Bookmark sync indicator
* Advanced error handling
* Dark mode support

---

## 👨‍💻 Author

**Suryansh Patel**

---

## ⭐ Notes

This project was developed as part of a Full Stack Developer assignment and demonstrates real-world MERN stack architecture, API design, authentication, and UI implementation.
