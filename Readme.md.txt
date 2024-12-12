Book Management and Review System

The Book Management and Review System allows users to manage books, add them to a database, and view or add reviews for the books. The system provides a user-friendly interface to manage books, display book details, and submit book reviews. The backend is built using Spring Boot and MongoDB, while the frontend is developed with ReactJS.

Project Overview

Functionalities:

Frontend: Built using ReactJS and styled with CSS.

Backend: Built using Spring Boot to handle API requests and MongoDB for data storage.

Features:
Add, delete, and update book details.
View book details, including reviews from external APIs like Google Books.
Add user reviews for books.

Features:-
Book Management: Add books with details like title, author, genre, publication date, rating, and description.
Book Details Page: View detailed information about each book, including reviews from external sources.
Review Submission: Add user reviews for each book with rating and review text.
Search and Pagination: Books are paginated and can be searched by title or author.
Responsive Design: The frontend is mobile-friendly and responsive.

Tech Stack:-
Frontend: ReactJS, React-Bootstrap, CSS
Backend: Spring Boot, MongoDB
Database: MongoDB
External API: Google Books API for fetching reviews (optional)
Deployment: Heroku, MongoDB Atlas

Setting Up the Project Locally:-
Step 1: Clone the Repository
Step 2: Set up the Backend
Step 3: Set up the Frontend

Installing Required Dependencies:-
Backend Dependencies: We use Maven to manage dependencies. Dependencies include Spring Boot, MongoDB, and others related to building a REST API.

Frontend Dependencies: In the frontend, the dependencies are managed via npm. The dependencies are React, React-Bootstrap, Axios(for making API calls), React Router.

Running the Application:-
1. From the backend directory, run the Spring Boot application. The backend will be available on http://localhost:8080.
2. In the frontend directory, run the React development server. The frontend will be available on http://localhost:3000.

Setting Up Environment Variables:-
1. Create a .env file in the frontend directory and add your Google Books API key.
2. In the backend directory, configure MongoDB and any other environment variables like: spring.data.mongodb.uri=mongodb://localhost:27017/book-management

Deploying the App:-
Backend(Spring Boot)
To deploy the backend to Heroku:
1. Install the Heroku CLI
2. From the backend directory, create a new Heroku app and deploy
3. Set up MongoDB 

Frontend(React)
To deploy the frontend to Heroku:
1. Build the React app
2. Create a new Heroku app and deploy the build
3. Open the deployed app

   