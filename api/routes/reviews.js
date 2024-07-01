import express from 'express';
import mongoose from 'mongoose';
// import Review from "../models/Review.js";

const router = express.Router();

// Define the review schema if it's not already defined in your model file
const reviewSchema = new mongoose.Schema({
    name: String,
    email: String,
    asal: String,
    phone: String,
    comment: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now },
});

// // Define the Review model if it's not already defined in your model file
const Review = mongoose.model('Review', reviewSchema);

// POST route to submit a new review
router.post('/', async (req, res) => {
    console.log('Received review data:', req.body); // Add this log
    const newReview = new Review(req.body);
    try {
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (err) {
        console.error('Error saving review:', err); // Add this log
        res.status(400).json({ message: err.message });
    }
});

// GET route to fetch all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err); // Add this log
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
});

export default router;
