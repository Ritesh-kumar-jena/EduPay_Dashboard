# EduPay_Dashboard Backend

A Node.js + Express backend for managing **users, orders, payments, transactions, and webhooks** with MongoDB.  
Integrates with **Edviron Payment Gateway API** for creating payment requests and handling payment status updates.

---

## 🚀 Features
- User authentication with JWT (signup & login)
- Orders management
- Payment link creation via Edviron API
- Transaction tracking
- Webhook listener for payment updates
- MongoDB persistence with Mongoose
- Middleware-based authentication

---

## 🛠 Tech Stack
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **Bcrypt** for password hashing
- **Axios** for API requests
- **Cors & Dotenv**

---

## 📦 Installation

Clone the repository:

```bash
git clone <https://github.com/Ritesh-kumar-jena/EduPay_Dashboard.git >
cd backend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
port=5000
database=<your-mongodb-uri>
key=<your-jwt-secret>
tokenExpireTime=7d

pg_key=<your-payment-gateway-secret>
API_KEY=<your-payment-gateway-api-key>
school_id=<your-school-id>
```

---

## 📂 Project Structure
```
backend/
│── Controller/
│   ├── userRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   ├── transactionRoutes.js
│   └── webhookRoutes.js
│
│── Model/
│   ├── userModel.js
│   ├── orderModel.js
│   ├── orderStatusModel.js
│   └── webhookLogModel.js
│
│── Middelware/
│   └── auth.js
│
│── db.js
│── index.js
│── package.json
│── README.md
```

---

## 🔑 API Endpoints

### 👤 User Routes (`/users`)
- `POST /users/signUp` → Register new user  
- `POST /users/login` → Login & get JWT token  

### 📦 Order Routes (`/orders`) *(protected)*
- `POST /orders` → Create order  
- `GET /orders` → Get all orders  

### 💳 Payment Routes (`/payments`) *(protected)*
- `POST /payments/create-payment` → Create payment request (returns payment URL)  
- `GET /payments/transaction-status/:custom_order_id` → Get transaction status  

### 📊 Transaction Routes (`/transactions`) *(protected)*
- `GET /transactions` → Get all transactions  
- `GET /transactions/school/:schoolId` → Get transactions by school  
- `GET /transactions/status/:collectId` → Get single transaction  

### 🔔 Webhook Routes (`/webhooklogs`)
- `POST /webhooklogs` → Receives payment updates from Edviron  
  - Saves logs to DB  
  - Updates `orderStatus` collection  

---

## ▶️ Example Flow
1. User signs up & logs in → gets JWT token.  
2. User creates an **order**.  
3. User requests **payment link** → API calls Edviron → returns `payment_url`.  
4. User completes payment on Edviron gateway.  
5. Gateway calls **webhook** → updates transaction status.  
6. User can check **transaction details** via `/transactions` or `/payments/transaction-status/:id`.

---

## Ritesh kumar Jena

