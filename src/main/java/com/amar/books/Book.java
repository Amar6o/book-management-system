package com.amar.books;


import org.bson.types.ObjectId;     // MongoDB's default ID type
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.annotation.Id;  // Marks this field as primary key in the MongoDB
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;


@Document(collection = "books") // Specifies that this class maps to the books collection
public class Book {

    @Id
    private ObjectId id; // MongoDB document ID

    @NotBlank(message = "Book ID cannot be empty")
    @Pattern(regexp = "B-\\d{3}", message = "Book ID must be in format B-001, B-002, etc.")
    private String bookId; // Sequence-based unique ID

    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title should not exceed 100 characters")
    private String title;

    @NotBlank(message = "Author is required")
    @Size(max = 50, message = "Author name should not exceed 50 characters")
    private String author;

    @NotNull(message = "Publication Date is required")
    private String publicationDate;

    @NotBlank(message = "ISBN is required")
    @Pattern(regexp = "^[0-9]{13}$", message = "ISBN must be exactly 13 digits")
    private String isbn;

    @NotBlank(message = "Genre is required")
    private Genre genre;

    @NotNull(message = "Rating is required")
    @Range(min = 1, max = 5, message = "Rating should be between 1 and 5")
    private String rating;

    private List<String> reviews; // List of reviews

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(String publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public List<String> getReviews() {
        return reviews;
    }

    public void setReviews(List<String> reviews) {
        this.reviews = reviews;
    }
}
