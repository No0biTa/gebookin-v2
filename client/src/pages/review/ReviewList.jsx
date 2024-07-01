import React from "react";
import "./review.css";

const ReviewList = ({ reviews }) => {
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

    return (
        <div className="reviewsContainer">
            {reviews.length > 0 ? (
                reviews.map((review) => (
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
                ))
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    );
};

export default ReviewList;
