# Orbit 🪐

**The Intelligent, Adaptive Study Companion.**

Orbit is a next-generation education platform that adapts to *you*. By combining real-time engagement tracking, AI-generated interactive content, and robust accessibility features, Orbit creates a personalized learning environment that evolves with your needs.

![Orbit App Screenshot]
<img width="1470" height="837" alt="Screenshot 2026-02-08 at 2 12 42 PM" src="https://github.com/user-attachments/assets/aa54c5a2-af9f-43ae-90c5-ad333a30aa27" />

<img width="1470" height="831" alt="Screenshot 2026-02-08 at 2 23 07 PM" src="https://github.com/user-attachments/assets/568cc522-9935-4877-8c67-e3524d6c13e2" />

## 📖 About The Project

For the full story behind Orbit, including our inspiration, challenges, and future plans, check out [**ABOUT.md**](./ABOUT.md).

## ✨ Key Features

-   **📄 Smart Decomposition**: Upload PDFs/text and get structured, bite-sized modules.
-   **🎯 Adaptive Learning**: Content adapts based on your quiz scores and real-time engagement.
-   **👁️ Engagement Tracking**: Uses client-side computer vision (MediaPipe) to detect confusion or focus.
-   **🔬 Interactive Simulations**: AI-generated simulations to visualize complex topics.
-   **🗣️ Voice-First Accessibility**: Full navigation and interaction via voice for visually impaired users.
-   **🔁 Smart Revision**: Targeted revision sessions based on your "lagging" topics.

## 🛠️ Tech Stack

### **Frontend**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Threejs](https://img.shields.io/badge/Threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
*   **Framework**: React (Vite)
*   **State**: TanStack Query
*   **UI**: Shadcn/UI, Framer Motion
   <img width="5805" height="3255" alt="Christmas Shopping Car Flow-2026-02-08-102345" src="https://github.com/user-attachments/assets/33206b44-a2fa-4cea-92ca-95d8c16a3c5b" />


### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
*   **Server**: Node.js & Express
*   **AI**: Google Gemini (via `@google/genai`)
*   **DB**: MongoDB (Mongoose)

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB Instance (Local or Atlas)
*   A Clerk account (for authentication)
*   A Google Gemini API Key

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/Priyanshusharma2006/Orbit.git
    cd Orbit
    ```

2.  **Environment Setup**
    *   **Frontend**: Create a `.env` file in the `frontend/` directory with your Clerk publishable key.
        ```env
        VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
        ```
    *   **Backend**: Create a `.env` file in the `backend/` directory with your MongoDB connection string and Gemini API key. *(Note: If using local MongoDB, use `127.0.0.1` instead of `localhost` to avoid Node.js IPv6 resolution timeouts).*
        ```env
        MONGODB_URI=mongodb://127.0.0.1:27017/orbit
        GEMINI_API_KEY=your_gemini_key_here
        ```

3.  **Setup Backend**
    ```sh
    cd backend
    npm install
    npm run dev
    ```
    *The backend server will run on `http://localhost:8000`.*

4.  **Setup Frontend**
    Open a new terminal window:
    ```sh
    cd frontend
    npm install
    npm run dev
    ```
    *The frontend will run on `http://localhost:8080` (or whichever port Vite assigns).*

---

## 📂 Documentation

-   [**Frontend Details**](./frontend/README.md)
-   [**Backend Details**](./backend/README.md)


