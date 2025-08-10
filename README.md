FAN is a full-stack speech learning application designed to help children enhance their speech and language skills through interactive flashcards and real-time vocal feedback. Tailored for educators, it provides a secure platform to manage learners, track progress with notes, and deliver personalized learning experiences. This project highlights my expertise in building secure, scalable APIs and user-focused educational tools, making it a strong addition to my portfolio for potential employers.

TABLE OF CONTENTS
Project Overview
Key Features
Tech Stack
Installation
API Endpoints
Project Structure
Why This Project?
License



PROJECT OVERVIEW
FAN supports children's speech development by offering an engaging platform for teachers to manage learners and monitor progress. The backend, built with Node.js and Express, ensures secure authentication and efficient data management with MongoDB. The application features robust user authentication, learner management, and a notes system, with a frontend  for interactive flashcards and vocal feedback processing. This project demonstrates my ability to design production-ready APIs with a focus on security, scalability, and user experience.Key FeaturesSecure Authentication: Teachers can register and log in using JWT-based authentication with password hashing for security.
Learner Management: Enables teachers to create, update, delete, and search for learners, with pagination for efficient data handling.
Progress Tracking: Teachers can add and retrieve notes for individual learners to provide personalized feedback.
Interactive Learning: Supports flashcards and vocal feedback for children .
Data Security: Restricts access to ensure teachers only manage their own learners.
Scalable Design: Uses MongoDB with Mongoose for flexible and efficient data management.

TECH STACK
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JSON Web Tokens (JWT), bcrypt
Dependencies: Express, Mongoose, JWT, http-status-codes, CORS, dotenv
Development Tools: Nodemon, Vercel for deployment
Code Quality: Custom error handling, async middleware for clean and maintainable code

INSTALLATION
To set up ChamCham locally:Clone the repository: Clone from your GitHub repository URL and navigate to the project directory.
Install dependencies: Run 'npm install' to install required packages.
Configure environment variables: Create a .env file with your MongoDB connection string and JWT secret key.
Run the application: Use npm run dev for development with Nodemon, or node index.js for production.
Access the API: The server runs on http://localhost:3000 (or your configured port).

API ENDPOINTS
The backend provides a RESTful API for managing users and learners. Key endpoints include:
Register: Create a new teacher account (no authentication required).
Login: Authenticate and receive a JWT token (no authentication required).
Get Users: Retrieve all learners for the authenticated teacher.
Search Learners: Retrieve learners with optional name filtering and pagination.
Add Learner: Create a new learner profile.
Add Note: Add a note for a specific learner.
Get Notes: Retrieve notes for a specific learner.
Update Learner: Modify a learner's details.
Delete Learner: Remove a learner from the system.

All endpoints except registration and login require JWT authentication.

PROJECT STRUCTURE
models/: Contains schemas for teachers and learners with notes.
routes/: Includes authentication routes for registration/login and learner routes for management.
errors/: Defines custom error classes for consistent error handling.
async.js: Provides async middleware for cleaner error handling.
index.js: Application entry point.
package.json: Lists dependencies and scripts.
.env: Stores environment variables (not committed).
README.md: Project documentation.

WHY THIS PROJECT?
ChamCham showcases my ability to:
-Develop secure, scalable RESTful APIs using Node.js and Express.
-Implement JWT authentication and role-based access control.
-Design efficient MongoDB schemas and queries with Mongoose.
-Ensure robust error handling with custom middleware and standardized HTTP responses.
-Build an impactful educational tool that addresses real-world needs.


LICENSE
This project is licensed under the ISC License. See the LICENSE file for details.


This project reflects my dedication to writing clean, maintainable code and delivering solutions with practical value, skills I bring to any development role.

