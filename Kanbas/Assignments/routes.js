import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    const createAssignment = async (req, res) => {
        const { courseId } = req.params;
        const assignment = await dao.createAssignment({
            ...req.body,
            course: courseId
        });
        res.json(assignment);
    };

    const findAssignmentsForCourse = async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    };

    const updateAssignment = async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.updateAssignment(assignmentId, req.body);
        res.json(status);
    };

    const deleteAssignment = async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.json(status);
    };

    const findAssignmentById = async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await dao.findAssignmentById(assignmentId);
        res.json(assignment);
    };

    app.post("/api/courses/:courseId/assignments", createAssignment);
    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.get("/api/assignments/:assignmentId", findAssignmentById);
    app.put("/api/assignments/:assignmentId", updateAssignment);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
} 