# 📚 expressBookReviews

An Express.js-based RESTful API project that allows users to register, log in, and manage book reviews. The application supports public routes for browsing books and protected routes for authenticated users to post or update their book reviews.

---

## 🚀 Features

- 📖 View book details by:
  - ISBN
  - Author
  - Title
- 👤 User registration and login (JWT-based authentication)
- 🛡️ Protected routes for authenticated users
- ✍️ Add or modify book reviews
- 🧾 View reviews for specific books

---

## 📂 Project Structure
final_project/
├── booksdb.js        # Static data for books
├── index.js          # Main entry point
├── router/
│   ├── general.js    # Public routes
│   └── auth_users.js # Protected routes (login, review)
├── package.json
└── README.md

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- JavaScript (ES6)

---

📬 API Endpoints
Public Routes (in general.js)
GET / - Get all books

GET /isbn/:isbn - Get book by ISBN

GET /author/:author - Get books by author

GET /title/:title - Get books by title

GET /review/:isbn - Get reviews for a book

POST /register - Register a new user

Protected Routes (in auth_users.js)
POST /customer/login - Log in as a registered user

PUT /auth/review/:isbn - Add or modify a book review

---

📸 Screenshots
Screenshots of the output on Postman are included in the /screenshots folder

---

💻 Author
Aditya Yadav

GitHub: @adityayayadavv
