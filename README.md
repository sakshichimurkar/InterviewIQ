# 🎯 InterviewIQ — AI-Powered Interview Preparation Platform

InterviewIQ is a full-stack **AI-powered interview preparation platform** designed to help users practice interviews through an interactive and personalized experience.

The application combines the **MERN Stack**, **Firebase Authentication**, **JWT-based authentication**, and **AI integration** to provide a complete interview preparation workflow.

🌐 **Live Application:**
https://interviewiq-client-mky6.onrender.com

---

## 🚀 Features

* 🤖 **AI-Powered Interview Experience** — Uses AI to provide intelligent and personalized interview interactions.
* 📄 **Resume-Based Interview Preparation** — Users can provide their resume information for more relevant interview preparation.
* 🎤 **Interactive Interview Practice** — Provides an interactive environment for practicing interview questions.
* 🔐 **Google Authentication** — Secure Google sign-in implemented using Firebase Authentication.
* 🔑 **JWT Authentication** — Backend authentication using JSON Web Tokens.
* 🍪 **Secure HTTP-Only Cookies** — JWT tokens are securely managed through HTTP-only cookies.
* 🛡️ **Protected Routes** — Restricts access to authenticated application functionality.
* 🗄️ **MongoDB Database** — Stores and manages application data using MongoDB and Mongoose.
* 🔄 **RESTful APIs** — Backend APIs built using Node.js and Express.js.
* 📱 **Responsive Interface** — React-based user interface designed for different screen sizes.
* 🚀 **Production Deployment** — Full-stack application deployed on Render.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Firebase Authentication
* Axios

### Backend

* Node.js
* Express.js
* REST APIs
* JWT
* Cookie-based Authentication

### Database

* MongoDB
* Mongoose

### Authentication & Security

* Firebase Google Authentication
* JSON Web Tokens (JWT)
* HTTP-Only Cookies
* Protected Routes
* CORS

### AI Integration

* AI-powered interview functionality
* Personalized interview interactions

### Deployment & Development Tools

* Render
* Git
* GitHub
* npm
* VS Code

---

## 🏗️ Project Architecture

InterviewIQ follows a full-stack client-server architecture:

```text
User
  │
  ▼
React Frontend
  │
  ├──── Firebase Google Authentication
  │
  ▼
REST API
  │
  ▼
Node.js + Express.js Backend
  │
  ├──── JWT Authentication
  │
  ├──── AI Integration
  │
  ▼
MongoDB Database
```

---

## 📂 Project Structure

```text
InterviewIQ/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── assets/
│   │
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sakshichimurkar/InterviewIQ.git
```

Navigate to the project directory:

```bash
cd InterviewIQ
```

---

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

---

### 3. Install Backend Dependencies

Open another terminal and navigate to the server:

```bash
cd server
npm install
```

Start the backend:

```bash
npm run dev
```

If your backend uses a different start script, use:

```bash
npm start
```

---

## 🔐 Environment Variables

Create the required `.env` files for the frontend and backend.

Example backend configuration:

```env
MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

AI_API_KEY=your_ai_api_key
```

Add your Firebase configuration to the frontend environment according to your Firebase setup.

> ⚠️ Never commit your actual API keys, JWT secrets, Firebase secrets, or database credentials to GitHub.

---

## 🔄 Authentication Flow

The application implements authentication using **Firebase and JWT**.

```text
User
 ↓
Google Sign-In
 ↓
Firebase Authentication
 ↓
Frontend
 ↓
Backend Authentication API
 ↓
JWT Generated
 ↓
Secure HTTP-Only Cookie
 ↓
Authenticated User
 ↓
Protected Application Routes
```

This approach combines Google authentication with backend-controlled application sessions.

---

## 🧠 Key Concepts Implemented

Through this project, I implemented and practiced:

* MERN Stack application development
* React frontend development
* Node.js and Express.js backend development
* MongoDB database integration
* Mongoose models
* REST API development
* Firebase Google Authentication
* JWT authentication
* HTTP-only cookies
* Authentication and authorization
* Protected routes
* CORS configuration
* Frontend and backend integration
* AI API integration
* Async JavaScript
* Error handling
* Environment variable management
* Production deployment
* Git and GitHub version control

---

## 🌐 Deployment

The application is deployed using **Render**.

### Live Demo

🔗 https://interviewiq-client-mky6.onrender.com

Because the application is hosted on Render, the initial request may occasionally take a little longer when the service has been inactive.

---

## 🔮 Future Improvements

Some features that can be added in future versions:

* Docker containerization
* CI/CD pipeline using GitHub Actions
* AWS deployment
* Redis caching
* Automated testing
* Improved interview analytics
* Enhanced AI feedback
* Performance monitoring
* Kubernetes deployment

---

## 👩‍💻 Author

**Sakshi Chimurkar**

MERN Stack Developer | DevOps Enthusiast

GitHub:
https://github.com/sakshichimurkar

---

## 🔗 Project Links

**Live Application:**
https://interviewiq-client-mky6.onrender.com

**GitHub Repository:**
https://github.com/sakshichimurkar/InterviewIQ

---

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐.

---

**Built with MERN Stack, Firebase Authentication and AI integration.**
