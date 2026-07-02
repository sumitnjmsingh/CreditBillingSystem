# 💳 Credit Billing System

A full-stack **Credit Billing System** built using **Java (Play Framework)** and **React.js** that simulates the functionality of a real-world credit card management system.

The application allows users to create credit cards, perform transactions, generate billing statements, make payments, earn reward points, and manage their profile through a modern web interface.

---

# 🚀 Features

## 👤 User Management

- User Registration
- User Login (JWT Authentication)
- Forgot Password
- Reset Password
- Change Password
- Update User Profile
- Secure Authentication
- Protected Routes

---

## 💳 Credit Card Management

- Create Credit Card
- View All Cards
- View Card Details
- Block Card
- Unblock Card
- Check Available Credit Limit
- Reward Points Management

---

## 💰 Transactions

- Create Transaction
- Merchant Payment Simulation
- Search Transactions
- Download Transactions (CSV)
- Download Transactions (PDF)

---

## 📄 Billing

- Generate Monthly Billing Statement
- Outstanding Balance
- Previous Balance
- Current Balance
- Minimum Due
- Interest Calculation
- Late Fee Calculation
- GST Calculation

---

## 💵 Payments

- Pay Credit Card Bill
- Update Available Credit Limit
- Update Used Credit
- Payment Status

---

## 🎁 Rewards

- Reward Point Calculation
- Cashback Calculation
- Reward Balance

---

## 🔒 Security

- JWT Authentication
- BCrypt Password Encryption
- Protected APIs
- Role Based Authentication Ready
- Secure REST APIs

---

# 🏗 Tech Stack

## Backend

- Java 8
- Play Framework 2.5
- Ebean ORM
- MySQL
- JWT Authentication
- BCrypt
- Apache PDFBox
- OpenCSV

---

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- React Hot Toast
- Context API

# ⚙ Backend Modules

## Authentication

- Signup
- Login
- Forgot Password
- Reset Password
- Change Password

---

## User Module

- Update Profile
- View Profile

---

## Credit Card Module

- Create Card
- Get All Cards
- Card Details
- Block Card
- Unblock Card
- Available Limit

---

## Transaction Module

- CompletePayment
- Search Transactions
- Download CSV
- Download PDF

---

## Billing Module

- Monthly Statement Generation
- Interest Calculation
- Minimum Due
- GST
- Late Fee

---

## Payment Module

- Bill Payment
- Update Card Balance

---

## Reward Module

- Reward Points
- Cashback
- Reward Balance

---

# 🎨 Frontend Pages

### Authentication

- Login
- Signup
- Forgot Password
- Reset Password
- Change Password

---

### Dashboard

- Dashboard
- User Profile

---

### Credit Cards

- All Cards
- Create Card
- Card Details
- Billing Statement
- Available Limit
- Reward Balance
- Block Card
- Unblock Card

---

### Transactions

- MerchantSelection and Payment
- Transaction History
- Search Transaction
- Download CSV
- Download PDF

---

### Billing

- Billing Statement

---

### Payment

- Pay Bill

---

# 🔐 Authentication Flow

```
User Login

↓

JWT Generated

↓

Stored in Local Storage

↓

Axios Interceptor

↓

Authorization Header

↓

Protected Backend APIs
```

---

# 💳 Credit Card Flow

```
Create Card

↓

Generate Card Number

↓

Generate CVV

↓

Generate Expiry Date

↓

Save Card

↓

Available for Transactions
```

---

# 💰 Transaction Flow

```
Customer

↓

Select Card

↓

Enter Merchant Details

↓

Validate Card

↓

Validate CVV

↓

Check Available Limit

↓

Deduct Available Limit

↓

Increase Used Limit

↓

Save Transaction

↓

Generate Reward Points

↓

Success Response
```

---

# 📄 Billing Flow

```
Billing Date

↓

Collect Monthly Transactions

↓

Generate Statement

↓

Outstanding Balance

↓

Minimum Due

↓

Interest

↓

GST

↓

Late Fee

↓

Due Date
```

---

# 💵 Payment Flow

```
Pay Bill

↓

Reduce Outstanding Balance

↓

Increase Available Limit

↓

Update Used Limit

↓

Payment Successful
```

---

# 🛠 Installation

## Clone Repository

```bash
git clone https://github.com/sumitnjmsingh/CreditBillingSystem.git
```

---

## ⚙ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

---

### 1. Configure `application.conf`

Create the following file:

```
backend/conf/application.conf
```

Update the database configuration:

```conf
db.default.driver=com.mysql.jdbc.Driver
db.default.url="jdbc:mysql://localhost:3306/credit_card_db"
db.default.username=root
db.default.password=your_password
```

---

### 2. Configure Email Service

```conf
mail.username = ""
mail.password = ""
```


---

### 3. Configure Gemini API Key

Add your Gemini API key to `application.conf`.

```conf
API_KEY = "your_key"
```

---

### 4. Create the Database

Create a MySQL database named:

```sql
CREATE DATABASE credit_card_db;
```

Run Play Evolutions

---

```bash
sbt update
```

---

### 6. Run the Backend

Start the Play Framework application:

```bash
sbt run
```

The backend server will start at:

```
http://localhost:9000
```

---

## Frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```
