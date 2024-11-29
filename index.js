import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import "dotenv/config";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import PeopleRoutes from "./Kanbas/People/routes.js";
import session from "express-session";
import Hello from "./Hello.js";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);
const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
};

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1); // trust first proxy
    sessionOptions.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
PeopleRoutes(app);
Lab5(app);
Hello(app);

const port = process.env.PORT || 4000;
app.listen(port);