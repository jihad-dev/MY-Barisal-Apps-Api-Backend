import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFoundRoute } from "./app/middlewares/notFoundRoute";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./config/swagger";
const app = express();

// parser
app.use(express.json());
app.use(cors({
    origin: ["https://my-barisal-apps-admin-panel.vercel.app", "http://localhost:5173","http://localhost:5000"],
    credentials: true,
}));
app.use(cookieParser());

// ২. Swagger UI ডকুমেন্টেশন রাউট যুক্ত করুন
setupSwagger(app);

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello next level Developer!! Happy Coding...");
});

// global error handler
app.use(globalErrorHandler);

// handle not found route
app.use(notFoundRoute);

export default app;