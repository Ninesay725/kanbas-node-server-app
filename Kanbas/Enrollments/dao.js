import Database from "../Database/index.js";

export function findAllEnrollments() {
    return Database.enrollments;
}

export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export function deleteEnrollment(studentId, courseId) {
    Database.enrollments = Database.enrollments.filter(
        (enrollment) => !(enrollment.user === studentId && enrollment.course === courseId)
    );
}

export function findEnrollmentByCourseAndStudent(courseId, studentId) {
    return Database.enrollments.find(
        (enrollment) => enrollment.course === courseId && enrollment.user === studentId
    );
}


