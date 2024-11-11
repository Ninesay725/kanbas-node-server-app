import Database from "../Database/index.js";

export function findAllUsers() {
    return Database.users;
}

export function findUserById(userId) {
    return Database.users.find((user) => user._id === userId);
}

export function findUsersByRole(role) {
    return Database.users.filter((user) => user.role === role);
}

export function findUsersEnrolledInCourse(courseId) {
    const { users, enrollments } = Database;
    const enrolledUserIds = enrollments
        .filter(enrollment => enrollment.course === courseId)
        .map(enrollment => enrollment.user);
    return users.filter(user => enrolledUserIds.includes(user._id));
}

export function createUser(user) {
    const newUser = { ...user, _id: Date.now().toString() };
    Database.users = [...Database.users, newUser];
    return newUser;
}

export function updateUser(userId, userUpdates) {
    Database.users = Database.users.map(user =>
        user._id === userId ? { ...user, ...userUpdates } : user
    );
    return findUserById(userId);
}

export function deleteUser(userId) {
    const deletedUser = findUserById(userId);
    Database.users = Database.users.filter(user => user._id !== userId);
    // Also remove user from enrollments
    Database.enrollments = Database.enrollments.filter(
        enrollment => enrollment.user !== userId
    );
    return deletedUser;
} 