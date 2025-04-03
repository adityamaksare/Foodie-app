# Foodie - Food Delivery App

A modern MERN stack food delivery application with a responsive design, easy ordering system, and user-friendly interface.

![Foodie App](https://via.placeholder.com/800x400?text=Foodie+App)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Admin Panel Setup](#admin-panel-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure signup and login
- **Food Catalog**: Browse through various food categories
- **Cart Management**: Add, remove, and update food items in cart
- **Order Tracking**: Track your orders in real-time
- **Payment Integration**: Seamless payment processing
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Admin Dashboard**: Manage food items, orders, and users

## 🛠️ Tech Stack

- **Frontend**: React.js, CSS3, HTML5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe integration
- **Deployment**: (Specify your deployment platform)

## 📁 Project Structure

The project is organized into three main directories:

```
mern-food-delivery-app/
├── frontend/        # React frontend application
├── backend/         # Node.js + Express backend API
└── admin/           # Admin panel (React)
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mern-food-delivery-app.git
   cd mern-food-delivery-app
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

5. Seed the database (if provided):
   ```bash
   npm run seed
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory (if needed):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

### Admin Panel Setup

1. Navigate to the admin directory:
   ```bash
   cd ../admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the admin directory (if needed):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## 🖥️ Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   # In the backend directory
   npm run dev
   ```

2. Start the frontend application:
   ```bash
   # In the frontend directory
   npm start
   ```

3. Start the admin panel:
   ```bash
   # In the admin directory
   npm start
   ```

The frontend application will run on http://localhost:3000
The admin panel will run on http://localhost:3001
The backend server will run on http://localhost:5000

### Production Mode

1. Build the frontend:
   ```bash
   # In the frontend directory
   npm run build
   ```

2. Build the admin panel:
   ```bash
   # In the admin directory
   npm run build
   ```

3. Start the production server:
   ```bash
   # In the backend directory
   npm start
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user details

### Food Items
- `GET /api/food` - Get all food items
- `GET /api/food/:id` - Get a specific food item
- `GET /api/food/category/:category` - Get food items by category

### Cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `GET /api/cart` - Get user's cart

### Orders
- `POST /api/order/place` - Place a new order
- `GET /api/order/userorders` - Get user's orders
- `GET /api/order/:id` - Get a specific order

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by [Your Name]




