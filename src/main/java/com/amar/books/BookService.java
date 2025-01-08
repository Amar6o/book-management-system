package com.amar.books;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    public Book addBook(Book book){
        // Generate a unique ID for the book
        book.setBookId(sequenceGeneratorService.generateSequence("book_sequence"));

        // Save the book to the database
        return bookRepository.save(book);
    }

    // Get all books
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    // Get a book by its ID
    public Book getBookById(String bookId){
        return bookRepository.findById(bookId).orElse(null);
    }

    // Method to delete a book by its bookId
    public boolean deleteBook(String bookId) {
        Book book = bookRepository.findByBookId(bookId);  // Use findByBookId for custom IDs
        if (book != null) {
            bookRepository.delete(book);
            return true;
        }
        return false;
    }

    // Fetch paginated books
    public Page<Book> getBooks(int page, int size, String sortField, String sortOrder) {
        Sort sort = Sort.by(Sort.Order.by(sortField));  // Using the dynamic sortField

        if ("desc".equals(sortOrder)) {
            sort = sort.descending();          // Change to descending if sortOrder is desc
        } else {
            sort = sort.ascending();           // Default to ascending
        }

        Pageable pageable = PageRequest.of(page, size, sort);       // Page request with sorting
        return bookRepository.findAll(pageable);                    // Fetch the books with pagination and sorting
    }

    //Method to find a book by its bookId
    public Book findBookByBookId(String bookId){
        return bookRepository.findByBookId(bookId);
    }


    public List<Book> searchBooks(String query){
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }
}
