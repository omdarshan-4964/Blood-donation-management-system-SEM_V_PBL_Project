# LifeLink – Blood Donation Management System

LifeLink is a full-stack MERN application designed to streamline blood donation workflows by directly connecting hospitals and donors. It provides a centralized platform for hospitals to raise blood requests, for donors to respond based on compatibility, and for admins to manage and monitor the system — eliminating the need for traditional blood bank intermediaries.

## Live Demo

https://life-link-9ajo.onrender.com/

## Features

- **Role-Based Access Control:** Differentiated dashboards and permissions for Hospitals, Donors, and Admins.
- **Secure Login System:** JWT-based authentication to ensure only authorized users access protected data.
- **Blood Request Lifecycle:** Hospitals can create requests; donors can accept them; hospitals then mark them as completed.
- **Donor Matching:** Donors can view and accept relevant blood requests filtered by location and blood group.
- **Donation History:** Hospitals can update and maintain donation logs; donors can view their own history.
- **Notification System:** Donors receive notifications for newly created compatible requests.
- **Admin Dashboard:** View total hospitals/donors, manage users, and monitor platform usage.
- **Real-time Dashboards:** Live request statuses and donor/hospital activity views.
- **Modern UI/UX:** Fully responsive interface with dark/light mode toggle using Tailwind CSS.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT)

---

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (A free MongoDB Atlas account is recommended)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/LifeLink.git
   cd LifeLink
   
2. **Setup the Backend (`backend`):**
  ```bash 
   cd backend
   npm install
   ```
   - Create a `.env` file in the `server` directory.
   - Fill in the required environment variables, especially your `MONGO_URI` and a strong `JWT_SECRET`.

3.  **Setup the Frontend (`frontend`):**
    ```bash
    cd ../frontend
    npm install
    ```
    - The frontend is configured to proxy API requests to `http://localhost:5000` during development, so no `.env` file is needed for development.

### Running the Application

1.  **Run the Backend Server:**
    - From the `server` directory:
    ```bash
    npm run dev
    ```
    - The server will start on `http://localhost:5000`.

2.  **Run the Frontend Client:**
    - From the `client` directory (in a new terminal):
    ```bash
    npm run dev
    ```
    - The client will start on `http://localhost:5173`.

You can now open your browser and navigate to `http://localhost:5173` to use the application.
