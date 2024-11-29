import model from "./model.js";
import mongoose from "mongoose";

export const updateModule = async (mid, module) => {
    try {
        const objectId = new mongoose.Types.ObjectId(mid);
        const status = await model.updateOne(
            { _id: objectId },
            { $set: { name: module.name } }
        );
        return status;
    } catch (error) {
        console.error("Error in updateModule:", error);
        throw error;
    }
};

export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
}

export function createModule(module) {
    delete module._id;
    return model.create(module);
}

export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
} 