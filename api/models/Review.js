import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        asal: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },{timestamps:true}
);

export default mongoose.model("Review", ReviewSchema)