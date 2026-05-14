# GenAI Interview Report Generator

An AI-powered full-stack web application that analyzes a candidate’s resume, job description, and self-description to generate a structured interview preparation report using Google Gemini AI.

The project focuses on backend architecture, AI integration, authentication, file processing, and production deployment using Docker and AWS ECS.

---

# Live Deployment

Deployed on AWS ECS using Docker containers, Amazon ECR, and an Application Load Balancer.

---

# Key Features

## AI-Powered Interview Report Generation

Upload a resume and provide:

* Job Description
* Self Description

The system generates:

* Match Score
* Technical Interview Questions
* Behavioral Interview Questions
* Skill Gap Analysis
* Personalized Preparation Plan

using Google Gemini AI.

---

## Secure Authentication System

Implemented a production-style authentication workflow using:

* JWT Authentication
* HTTP-only Cookies
* Password Hashing with bcrypt
* Authentication Middleware
* Token Blacklisting
* Protected Routes

---

## Resume Parsing

* PDF Resume Upload Support
* In-memory file processing using Multer
* Resume text extraction using pdf-parse

---

## Backend Architecture

Structured backend using:

* MVC Pattern
* Middleware-based request handling
* Service Layer abstraction
* Prisma ORM integration
* Modular route/controller architecture

---

## Deployment & DevOps

* Dockerized full-stack application
* AWS ECS deployment
* Amazon ECR image hosting
* Application Load Balancer integration
* Environment-based configuration

---

# Tech Stack

## Frontend

* React
* Vite
* React Router
* Axios
* Sass

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT
* bcryptjs
* Multer
* Cookie Parser
* Zod

## AI Integration

* Google Gemini API

## Deployment

* Docker
* AWS ECS
* Amazon ECR
* AWS Application Load Balancer

---

# Project Architecture

```txt
Client (React + Vite)
        ↓
Express API Server
        ↓
Authentication Middleware
        ↓
Prisma ORM
        ↓
PostgreSQL Database
        ↓
Google Gemini AI
```

---

# Authentication Flow

The authentication system is built using JWT and secure cookies.

## Workflow

1. User registers or logs in
2. JWT token is generated
3. Token is stored in HTTP-only cookies
4. Protected routes verify token using middleware
5. Blacklisted tokens are rejected during authentication

---

# AI Report Structure

The application generates structured interview reports containing:

```json
{
  "matchScore": 85,
  "technicalQuestions": [],
  "behavioralQuestions": [],
  "skillsGap": [],
  "preparationPlan": []
}
```

The AI response is validated against a predefined schema to maintain structured output consistency.

---

# Folder Structure

```txt
GenAI-Project/
│
├── client/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── db.js
│   │   └── index.js
│   │
│   ├── auth.route.js
│   ├── auth.interview.js
│   ├── server.js
│   └── package.json
│
├── Dockerfile
└── README.md
```

---

# Local Development Setup

## Clone Repository

```bash
git clone https://github.com/ishanhanda11/GenAI-Project.git
cd GenAI-Project
```

---

# Install Dependencies

## Frontend

```bash
cd client
npm install
```

## Backend

```bash
cd ../server
npm install
```

---

# Environment Variables

Create a `.env` file inside the `server` directory.

```env
DATABASE_URL=
JWT_SECRET=
GOOGLE_GENAI_API_KEY=
CLIENT_URL=
```

---

# Prisma Setup

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

---

# Running the Application

## Start Backend Server

```bash
cd server
npm run dev
```

## Start Frontend

```bash
cd client
npm run dev
```

---

# Docker Setup

Build Docker image:

```bash
docker build -t genai-project .
```

Run container:

```bash
docker run -p 3000:3000 genai-project
```

---

# AWS Deployment Workflow

The application is deployed using:

* Amazon ECS
* Amazon ECR
* Docker Containers
* Application Load Balancer

Deployment workflow:

1. Build Docker image
2. Push image to Amazon ECR
3. Update ECS Service
4. Force new deployment
5. ECS creates new running task automatically

---

# Backend Concepts Implemented

This project demonstrates practical implementation of:

* REST API Design
* JWT Authentication
* Middleware Architecture
* File Upload Handling
* PDF Parsing
* AI Integration
* ORM-based Database Access
* Docker Containerization
* Cloud Deployment
* CORS Handling
* Environment-based Configuration
* Structured AI Response Generation

---

# Challenges Solved During Development

* AI response structure validation
* PDF resume parsing
* Secure authentication workflow
* Docker container networking
* AWS ECS deployment issues
* Static asset serving in production
* CORS configuration in cloud deployment
* Express production routing setup

---

# Future Improvements

* Refresh Token Rotation
* Redis-based session caching
* Rate Limiting
* Role-based authorization
* CI/CD Pipeline Integration
* Interview analytics dashboard
* WebSocket-based mock interviews
* Export reports as PDF

---

# Repository

GitHub Repository:

[https://github.com/ishanhanda11/GenAI-Project](https://github.com/ishanhanda11/GenAI-Project)

---

# Author

Ishan Handa

Backend-focused developer interested in scalable backend systems, real-time applications, AI integrations, and cloud deployment workflows.
