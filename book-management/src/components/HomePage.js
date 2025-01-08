import React from "react";
import { Link } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Welcome to the Book Management System</h1>
            <p>
                This is the home page where you can manage your book collection.
        
            </p>
            <div>
                <Link to="/list" className="btn btn-primary">
                    View Book List
                </Link>
                <br />
                <Link to="/add" className="btn btn-secondary">
                    Add a New Book
                </Link>
            </div>
        </div>
    );

};

export default HomePage;