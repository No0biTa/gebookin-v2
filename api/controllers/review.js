import Review from "../models/Review.js";

export const getReview = async (req,res,next)=>{
    try{
        const review = await Review.findById(req.params.id);
        res.status(200).json(review)
    }catch (err){
        next(err);
    }
}

export const getReviews = async (req,res,next)=>{
    try{
        const review = await Review.find();
        res.status(200).json(review)
    }catch (err){
        next(err)
    }
}