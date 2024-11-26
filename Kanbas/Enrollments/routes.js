import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.post("/api/enrollments", (req, res) => {
        const enrollment = dao.createEnrollment(req.body);
        res.json(enrollment);
    });

    app.delete("/api/enrollments/:studentId/:courseId", (req, res) => {
        const { studentId, courseId } = req.params;
        dao.deleteEnrollment(studentId, courseId);
        res.sendStatus(204);
    });

    app.get("/api/enrollments/:courseId/:studentId", (req, res) => {
        const { courseId, studentId } = req.params;
        const enrollment = dao.findEnrollmentByCourseAndStudent(courseId, studentId);
        res.json(enrollment);
    });
} 