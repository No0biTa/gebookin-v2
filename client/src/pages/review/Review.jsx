import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import "./review.css";

const Review = () => {
    const [reviews, setReviews] = useState([]); // State for storing reviews
    const { dispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch reviews when component mounts
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get("https://gebookin-admin.vercel.app/reviews");
                setReviews(res.data);
            } catch (err) {
                console.error("Error fetching reviews:", err);
                dispatch({ type: "FETCH_REVIEWS_FAILURE", payload: { message: "Failed to fetch reviews" } });
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [dispatch]);

    const handleNewReview = (newReview) => {
        setReviews(prevReviews => [...prevReviews, newReview]);
    };

    // Calculate the average rating
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
        : 0;

    const getStarElements = (rating) => {
        const stars = [];
        const roundedRating = Math.round(rating); // Round the rating to the nearest whole number

        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                stars.push(<span key={i} className="star filled">★</span>);
            } else {
                stars.push(<span key={i} className="star">☆</span>);
            }
        }

        return stars;
    };

    return (
        <div className="review">
            <ReviewForm onNewReview={handleNewReview} />
            {loading ? (
                <p>Loading reviews...</p>
            ) : (
                <>
                    <div className="averageRatingContainer">
                        <h2>Average Rating: {averageRating}</h2>
                        <div className="stars">
                            {getStarElements(averageRating)}
                        </div>
                    </div>
                    <ReviewList reviews={reviews} />
                </>
            )}
        </div>
    );
};

export default Review;
