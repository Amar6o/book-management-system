import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="container mt-5">
      <Routes>                                       
        {/* Home page as  the default route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<BookForm />} />
        <Route path="/list" element={<BookList />} />
        <Route path="/book-details/:bookId" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
