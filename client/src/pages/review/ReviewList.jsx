import React, { useState } from "react";
import "./review.css";

const ReviewList = ({ reviews }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 10; // 5 reviews per column

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
                    ★
                </span>
            );
        }
        return stars;
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="reviewsContainer">
            {reviews.length > 0 ? (
                <div className="reviewsGrid">
                    {currentReviews.map((review) => (
                        <div key={review._id} className="reviewItem">
                            <div className="reviewHeader">
                                <h3>{review.name}</h3>
                                <div className="rating">{renderStars(review.rating)}</div>
                            </div>
                            <p><strong>Email:</strong> {review.email}</p>
                            <p><strong>Asal:</strong> {review.asal}</p>
                            <p><strong>Phone:</strong> {review.phone}</p>
                            <p><strong>Comment:</strong> {review.comment}</p>
                            <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews available.</p>
            )}

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`pageButton ${index + 1 === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
