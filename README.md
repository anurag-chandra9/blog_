# Blog Platform

A full-stack blog platform built with React and Django, deployable to Azure.

## Project Structure
```
blog_platform/
├── backend/         # Django backend
│   ├── api/        # REST API endpoints
│   ├── blog/       # Main Django app
│   └── manage.py
└── frontend/       # React frontend
    ├── public/
    └── src/
```

## Setup Instructions

### Backend Setup
1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run migrations:
   ```bash
   cd backend
   python manage.py migrate
   ```

4. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## Features
- Blog post creation and viewing
- Responsive design
- REST API
- Authentication
- Azure deployment ready
- Optional LLM integration for content generation

## API Endpoints
- GET /api/posts/ - List all posts
- POST /api/posts/ - Create a new post
- GET /api/posts/{id}/ - Retrieve specific post

## Deployment
Refer to the deployment documentation for Azure setup instructions.
