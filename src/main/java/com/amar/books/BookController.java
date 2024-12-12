package com.amar.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookService bookService;

    // Add a new book
    @PostMapping
    public ResponseEntity<Book> addBook(@Validated @RequestBody Book book){
        try{
            Book savedBook = bookService.addBook(book);
            return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to get all books
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks(){
        List<Book> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    // Endpoint to delete a book
    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable String bookId) {
        boolean isDeleted = bookService.deleteBook(bookId);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Paginated retrieval of books
    @GetMapping("/paged")
    public ResponseEntity<Page<Book>> getBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> books = bookService.getBooks(pageable);
        return ResponseEntity.ok(books);
    }

    @PutMapping("/{bookId}/reviews")
    public ResponseEntity<Book> addReview(@PathVariable String bookId, @RequestBody String review){
        Book updatedBook = bookService.addReview(bookId, review);
        if (updatedBook != null){
            return ResponseEntity.ok(updatedBook);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    // API endpoint to find book by bookId
    @GetMapping("/findByBookId/{bookId}")
    public ResponseEntity<Book> getBookByBookId(@PathVariable String bookId){
        Book book = bookService.findBookByBookId(bookId);
        if (book != null){
            return new ResponseEntity<>(book, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
