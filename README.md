# DevPulse – Internal Tech Issue & Feature Tracker

## Live URL
https://your-live-url.com

---

## Project Overview

DevPulse is a backend API system for managing internal software issues and feature requests. It allows team members to report bugs, suggest features, and track issue progress using role-based permissions.

The system is built with Node.js, Express, TypeScript, and PostgreSQL using raw SQL queries.

---

## Features

### Authentication
- User registration (contributor / maintainer roles)
- User login with JWT authentication
- Password hashing using bcrypt
- Protected routes with JWT middleware
- Role-based authorization system

### Issue Management
- Create new bug or feature request
- View all issues with filtering and sorting
- View single issue details
- Update issue (based on role permissions)
- Delete issue (maintainer only)
- Issue status workflow: open, in_progress, resolved

### System Features
- Modular Express.js structure
- Centralized error handling
- Reusable utility functions
- PostgreSQL connection pooling
- Raw SQL queries (no ORM)
- Strict TypeScript usage

---

## Tech Stack

- Node.js (LTS)
- TypeScript
- Express.js
- PostgreSQL
- pg (native driver)
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- cors

---

### 2. Create Environment Variables

PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10

### 3. Run Development Server
npm run dev

### 4. Build Project
npm run build

### 5. Start Production Server
npm start


## API Endpoint List
### Authentication
POST /api/auth/signup → Register user
POST /api/auth/login → Login user
### Issues
POST /api/issues → Create issue (Auth required)
GET /api/issues → Get all issues (with filters)
GET /api/issues/:id → Get single issue
PATCH /api/issues/:id → Update issue (role-based)
DELETE /api/issues/:id → Delete issue (maintainer only)

## Query Parameters:
sort = newest | oldest
type = bug | feature_request
status = open | in_progress | resolved

## Database Schema Summary
### users table
id: Auto-increment primary key
name: Full name
email: Unique email address
password: Hashed password (never returned)
role: contributor / maintainer (default: contributor)
created_at: Timestamp
updated_at: Timestamp

### issues table
id: Auto-increment primary key
title: Issue title (max 150 characters)
description: Detailed issue description
type: bug | feature_request
status: open | in_progress | resolved
reporter_id: ID of user who created issue
created_at: Timestamp
updated_at: Timestamp


## Authentication Flow
User registers or logs in
Server validates credentials
JWT token is generated
Client stores token
Token is sent in Authorization header
Server verifies token before protected routes
