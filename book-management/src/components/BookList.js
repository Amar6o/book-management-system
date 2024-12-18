import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table, Button, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortField, setSortField] = useState("bookId");
    const [sortOrder, setSortOrder] = useState("asc");

    const pageSize = 10;
    const navigate = useNavigate();

    // Fetch books from the server
    const fetchBooks = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/books/paged", {
                params: {
                    page: currentPage - 1,
                    size: pageSize,
                    sortField: sortField,       
                    sortOrder: sortOrder,  
                },
            });

            console.log("Fetching books with:", {
                page: currentPage - 1,
                size: pageSize,
                sort: `${sortField},${sortOrder}`,
            });
    
            setBooks(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching books:", error.message || error);
        }
    }, [currentPage, sortField, sortOrder]);
    

    useEffect(() => {
        console.log("Fetching books with updated sortField:", sortField, "and sortOrder:", sortOrder);
        fetchBooks();
    }, [fetchBooks, sortField, sortOrder]);

    // Delete a book
    const handleDelete = async (bookId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/books/${bookId}`);
            fetchBooks(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting book:", error.message || error);
        }
    };

    // Handle sorting
    const handleSort = (field) => {
        const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        console.log("Sorting field:", field, "Order:", order);
        setSortField(field);
        setSortOrder(order);
    };    

    const getSortArrow = (field) => {
        if (sortField !== field) return ""; // No arrow for inactive columns
        return sortOrder === "asc" ? "↑" : "↓"; // Up arrow for ascending, down arrow for descending
    };
    

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Render pagination
    const renderPagination = () => {
        const items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return <Pagination>{items}</Pagination>;
    };

    // Navigate to the BookForm page
    const handleBack = () => {
        navigate("/");
    };

    // Navigate to the book details page
    const handleViewDetails = (bookId) => {
        navigate(`/book-details/${bookId}`);
    };

    return (
        <div>
            <h2 className="book-list-title">Book List</h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th onClick={() => handleSort("bookId")}>
                        Book ID {getSortArrow("bookId")}
                    </th>
                    <th onClick={() => handleSort("title")}>
                        Title {getSortArrow("title")}
                    </th>
                    <th onClick={() => handleSort("author")}>
                        Author {getSortArrow("author")}
                    </th>
                    <th onClick={() => handleSort("publicationDate")}>
                        Publication Date {getSortArrow("publicationDate")}
                    </th>
                    <th onClick={() => handleSort("genre")}>
                        Genre {getSortArrow("genre")}
                    </th>
                    <th onClick={() => handleSort("rating")}>
                        Rating {getSortArrow("rating")}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((book) => (
                            <tr key={book.bookId}>
                                <td>{book.bookId}</td>
                                <td>
                                    <Button variant="link" onClick={() => handleViewDetails(book.bookId)}>
                                        {book.title}
                                    </Button>
                                </td>
                                <td>{book.author}</td>
                                <td>{book.publicationDate}</td>
                                <td>{book.genre}</td>
                                <td>{book.rating}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(book.bookId)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No books found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button variant="secondary" onClick={handleBack} className="mb-3">Back</Button>
            {renderPagination()}
        </div>
    );
};

export default BookList;
