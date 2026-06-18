# AI Resume Analyzer

## Features

- User Authentication (JWT)
- Resume Upload (PDF)
- Cloudinary Storage
- PDF Text Extraction
- Gemini AI Resume Analysis
- ATS Score Generation
- Resume Summary
- Strengths & Weaknesses Analysis
- Missing Skills Detection
- Recommended Job Roles
- Keyword Analysis
- Resume CRUD Operations

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Cloudinary
- PDF-Parse
- Google Gemini API

## API Endpoints

### Auth
- POST /auth/register
- POST /auth/login

### Resume
- POST /resume
- GET /resume
- GET /resume/:id
- PUT /resume/:id
- DELETE /resume/:id

### Analysis
- POST /analysis/:id

## Future Improvements
- React Frontend
- Dashboard Analytics
- ATS Charts
- Resume Re-Analysis
- Download Analysis Report
