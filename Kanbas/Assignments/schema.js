import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    points: { type: Number, default: 100 },
    dueDate: Date,
    availableFromDate: Date,
    availableUntilDate: Date,
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
        required: true
    }
}, { collection: "assignments" });

export default assignmentSchema; 