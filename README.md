# 🤖 AI Resume Analyzer

An AI-powered Resume Analyzer that evaluates resumes using Google Gemini AI and provides ATS insights, missing skills, keyword analysis, and recommended job roles.

---

# 🚀 Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Resume Management

* Upload Resume (PDF)
* Cloudinary File Storage
* View Uploaded Resumes
* Delete Resume

### AI Resume Analysis

* ATS Score
* Resume Summary
* Strengths
* Weaknesses
* Missing Skills
* Recommended Job Roles
* ATS Keyword Analysis

  * Present Keywords
  * Missing Keywords
* Resume Improvement Suggestions

### Dashboard

* Average ATS Score
* Total Resumes
* Total Analyses
* Job Match Count
* Best Resume
* Latest Resume

### Profile

* User Information
* Total Uploaded Resumes
* Average ATS Score
* Best ATS Score
* Member Since

### Performance Optimization

* Analysis is saved in MongoDB.
* Already analyzed resumes open instantly without calling Gemini API again.

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* React Hot Toast
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* Cloudinary
* PDF-Parse
* Google Gemini API

---

# 📂 Project Structure

```
Frontend/
Backend/
```

---

# 🔗 API Endpoints

## Authentication

```
POST /auth/register
POST /auth/login
```

## Resume

```
POST /resume
GET /resume
GET /resume/:id
DELETE /resume/:id
```

## Analysis

```
GET /analysis/:id
```

## Dashboard

```
GET /dashboard
```

## Profile

```
GET /profile
```

---

# 📸 Screenshots

* Login Page
* Dashboard
* Resume Upload
* Resume Analysis
* Profile Page

(Add screenshots after deployment.)

---

# 🚀 Deployment

Frontend:

* Vercel

Backend:

* Render

Database:

* MongoDB Atlas

---

# 🔮 Future Improvements

* Resume Comparison
* Multiple Resume Versions
* Job Description Upload & ATS Match
* Recommend real job opportunities based on resume skills.
* Add direct Apply Links for recommended jobs
* Download Analysis Report (PDF)
* AI Resume Builder

---

# 👨‍💻 Author

**Chandan Singh**
