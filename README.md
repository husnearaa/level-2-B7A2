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


