import model from "./model.js";

export async function findCoursesForUser(userId) {
    const enrollments = await model
        .find({ user: userId })
        .populate("course");
    
    // Filter out enrollments with null courses and map the remaining ones
    return enrollments
        .filter(enrollment => enrollment.course)
        .map((enrollment) => ({
            ...enrollment.course.toObject(),
            enrolled: true,
            _id: enrollment.course._id
        }));
}

export async function findUsersForCourse(courseId) {
    const enrollments = await model
        .find({ course: courseId })
        .populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
    return model.create({ user, course });
}

export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}

export const deleteEnrollmentsForCourse = async (courseId) => {
    try {
        return await model.deleteMany({ course: courseId });
    } catch (error) {
        console.error("Error deleting enrollments for course:", error);
        throw error;
    }
};

