import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

function App() {
  return (
    <div className="container mt-5">
      <Routes>
        {/* Make BookForm the default route */}
        <Route path="/" element={<BookForm />} />
        <Route path="/list" element={<BookList />} />
        <Route path="/book-details/:bookId" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
