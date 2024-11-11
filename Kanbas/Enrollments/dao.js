import Database from "../Database/index.js";

export function findAllEnrollments() {
    return Database.enrollments;
}

export function createEnrollment(enrollment) {
    const newEnrollment = { ...enrollment, _id: Date.now().toString() };
    Database.enrollments = [...Database.enrollments, newEnrollment];
    return newEnrollment;
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