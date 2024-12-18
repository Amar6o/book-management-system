package com.amar.books;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends MongoRepository<Book, String > {

    // Custom query method to find a book by its bookId
    Book findByBookId(String bookId);

    // Paging and sorting together
    Page<Book> findAll(Pageable pageable);

}
