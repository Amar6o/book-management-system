import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './BookForm.css';

const BookForm = ({ onBookAdded }) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    publicationDate: '',
    isbn: '',
    genre: 'Fiction',
    rating: '1'
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const genres = ['Fiction', 'NonFiction', 'Mystery', 'Fantasy', 'Romance', 'SciFi', 'Others'];

  const validate = () => {
    const newErrors = {};

    if (!bookData.title || bookData.title.length > 100) newErrors.title = 'Title is required and should be less than 100 characters';
    if (!bookData.author || bookData.author.length > 50) newErrors.author = 'Author is required and should be less than 50 characters';
    if (!bookData.publicationDate) newErrors.publicationDate = 'Publication Date is required';
    if (!/^\d{13}$/.test(bookData.isbn)) newErrors.isbn = 'ISBN should be exactly 13 digits';
    if (!bookData.rating || bookData.rating < 1 || bookData.rating > 5) newErrors.rating = 'Rating must be between 1 and 5';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the form data to check if it's correct
    console.log('Form Data:', bookData);

    if (!validate()) return;

    try {
      // Log the axios request
      console.log('Sending data to backend...');

      await axios.post('http://localhost:8080/api/v1/books', bookData);

      // Redirect to the book list page after successful submission
      navigate('/list'); // Assuming you want to go to the /list page
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Book Management System</h1>

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title:</label>
        <input
          type="text"
          className={`form-control ${errors.title && 'is-invalid'}`}
          name="title"
          value={bookData.title}
          onChange={handleChange}
          maxLength="100"
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          type="text"
          className={`form-control ${errors.author ? 'is-invalid' : ''}`}
          name="author"
          value={bookData.author}
          onChange={handleChange}
          maxLength="50"
        />
        {errors.author && <div className="invalid-feedback">{errors.author}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Publication Date</label>
        <input
          type="date"
          className={`form-control ${errors.publicationDate ? 'is-invalid' : ''}`}
          name="publicationDate"
          value={bookData.publicationDate}
          onChange={handleChange}
        />
        {errors.publicationDate && <div className="invalid-feedback">{errors.publicationDate}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">ISBN</label>
        <input
          type="text"
          className={`form-control ${errors.isbn ? 'is-invalid' : ''}`}
          name="isbn"
          value={bookData.isbn}
          onChange={handleChange}
          maxLength="13"
        />
        {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Genre</label>
        <select
          className="form-control"
          name="genre"
          value={bookData.genre}
          onChange={handleChange}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Rating</label>
        <input
          type="number"
          className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
          name="rating"
          value={bookData.rating}
          onChange={handleChange}
          min="1"
          max="5"
        />
        {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
    Add Book
  </button>

  {/* You can add a separate button to navigate to the list page */}
  <button
    type="button"
    className="btn btn-secondary mt-2"
    onClick={() => navigate('/list')}
  >
    Go to Book List
  </button>
</form>
</div>
  );
};

export default BookForm;
