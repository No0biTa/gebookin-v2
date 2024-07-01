import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./review.css";
import logo from "../../assets/Logo GeBookIn .png";

const ReviewForm = ({ onNewReview }) => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        asal: "",
        phone: "",
        comment: "",
        rating: 1, // Default rating
    });
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState(""); // State for feedback message

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleRatingChange = (value) => {
        setCredentials({ ...credentials, rating: parseInt(value) });
    };

    const handleReview = async (e) => {
        e.preventDefault();
        dispatch({ type: "REVIEW_START" });

        try {
            const url = "https://gebookin-admin.vercel.app/reviews";
            const reviewData = { ...credentials }; // Ensure rating is a number
            console.log(`Posting to URL: ${url}`); // Log URL for debugging
            console.log('Review data:', reviewData); // Log data being sent
            const res = await axios.post(url, reviewData);
            console.log('Response:', res.data); // Log response from server
            dispatch({ type: "REVIEW_SUCCESS", payload: res.data });
            onNewReview(res.data); // Pass new review to parent component
            setMessage("Review submitted successfully!");
            setTimeout(() => {
                setMessage("");
                navigate("/");
            }, 3000);
        } catch (err) {
            console.error("Error submitting review:", err); // Debugging log
            const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
            dispatch({ type: "REVIEW_FAILURE", payload: { message: errorMessage } });
            setMessage(errorMessage);
            setTimeout(() => {
                setMessage("");
                dispatch({ type: "CLEAR_ERROR" });
            }, 5000);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <label key={i} className={`star-label ${i <= credentials.rating ? 'filled' : ''}`}>
                    <input
                        type="radio"
                        name="rating"
                        value={i}
                        checked={credentials.rating === i}
                        onChange={() => handleRatingChange(i)}
                        className="star-input"
                    />
                    ★
                </label>
            );
        }
        return stars;
    };

    return (
        <form onSubmit={handleReview} className="formContainer">
            <div className="logoContainer">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Leave a Review</h2>
            <div className="inputGroup">
                <label htmlFor="name" className="lLabel">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    className="lInput"
                    value={credentials.name}
                    required
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="email" className="lLabel">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    className="lInput"
                    value={credentials.email}
                    required
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="asal" className="lLabel">Asal Instansi / Universitas</label>
                <input
                    type="text"
                    name="asal"
                    id="asal"
                    placeholder="Masukan Asal Anda"
                    onChange={handleChange}
                    className="lInput"
                    value={credentials.asal}
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="phone" className="lLabel">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                    className="lInput"
                    value={credentials.phone}
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="comment" className="lLabel">Comment</label>
                <textarea
                    name="comment"
                    id="comment"
                    placeholder="Enter your comment"
                    onChange={handleChange}
                    className="lInput"
                    value={credentials.comment}
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="rating" className="lLabel">Rating</label>
                <div className="stars">
                    {renderStars()}
                </div>
            </div>
            <button
                type="submit"
                className="lButton"
            >
                Submit Review
            </button>
            {message && (
                <div className="messageContainer">
                    <span className="message">{message}</span>
                </div>
            )}
        </form>
    );
};

export default ReviewForm;