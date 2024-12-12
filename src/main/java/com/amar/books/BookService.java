package com.amar.books;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<Book> getBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);  // Fetch books with pagination
    }

    public Book addReview(String bookId, String review){
        Book book = bookRepository.findById(bookId).orElse(null);
        if (book != null){
            if(book.getReviews() == null) {
                book.setReviews(new ArrayList<>());
            }
            book.getReviews().add(review);
            return bookRepository.save(book);
        }
        return null;
    }

    //Method to find a book by its bookId
    public Book findBookByBookId(String bookId){
        return bookRepository.findByBookId(bookId);
    }


}
