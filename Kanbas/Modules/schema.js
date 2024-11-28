import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses"
    }
}, { collection: "modules" });

export default moduleSchema;

