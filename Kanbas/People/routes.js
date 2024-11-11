import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function PeopleRoutes(app) {
    app.get("/api/courses/:courseId/users", (req, res) => {
        const { courseId } = req.params;
        const users = dao.findUsersEnrolledInCourse(courseId);
        res.json(users);
    });

    app.post("/api/courses/:courseId/users", (req, res) => {
        const { courseId } = req.params;
        const currentUser = req.session["currentUser"];
        if (currentUser?.role !== "FACULTY") {
            res.sendStatus(403);
            return;
        }
        const newUser = dao.createUser(req.body);
        enrollmentsDao.createEnrollment({
            user: newUser._id,
            course: courseId
        });
        res.json(newUser);
    });

    app.put("/api/courses/:courseId/users/:userId", (req, res) => {
        const currentUser = req.session["currentUser"];
        if (currentUser?.role !== "FACULTY") {
            res.sendStatus(403);
            return;
        }
        const { userId } = req.params;
        const status = dao.updateUser(userId, req.body);
        res.json(status);
    });

    app.delete("/api/courses/:courseId/users/:userId", (req, res) => {
        const currentUser = req.session["currentUser"];
        if (currentUser?.role !== "FACULTY") {
            res.sendStatus(403);
            return;
        }
        const { userId } = req.params;
        const status = dao.deleteUser(userId);
        res.json(status);
    });

    app.get("/api/courses/:courseId/users/role/:role", (req, res) => {
        const { role } = req.params;
        const users = dao.findUsersByRole(role);
        res.json(users);
    });
} 