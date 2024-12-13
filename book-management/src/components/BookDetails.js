import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './BookDetails.css';


const BookDetails = () => {
    const { bookId } = useParams(); // Get the bookId from the URL
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch book details
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/books/findByBookId/${bookId}`);
                setBook(response.data); // Set the book data if the request is successful
            } catch (err) {
                setError("Failed to load book details.");
                console.error("Error fetching book details:", err);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    // If book is null, return loading message or fallback UI
    if (error) {
        return <div>{error}</div>;
    }

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2 className="book-details-title">{book.title}</h2>
            <div className="book-details">
                <strong>Author:</strong> {book.author}
            </div>
            <div className="book-details">
                <strong>Genre:</strong> {book.genre}
            </div>
            <div className="book-details">
                <strong>Publication Date:</strong> {book.publicationDate}
            </div>
            <div className="book-details">
                <strong>Rating:</strong> {book.rating}
            </div>
            <div className="book-details">
                <strong>Description:</strong> {book.description || "No description available."}
            </div>

            {/* Add "Back to Book List" button */}
            <button onClick={() => navigate("/list")} className="btn btn-primary">
                Back to Book List
            </button>
        </div>
    );
};

export default BookDetails;