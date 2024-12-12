package com.amar.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MongoTemplate mongoTemplate;
    public Review createReview(String body, String bookId){
        Review review=reviewRepository.insert(new Review(body));


        mongoTemplate.update(Book.class)
                .matching(Criteria.where("bookId").is(bookId))
                .apply(new Update().push("reviews").value(review))
                .first();

        return review;
    }
}
