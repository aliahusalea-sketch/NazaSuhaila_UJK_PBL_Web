import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Manajemen Data Siswa berjalan!",
  });
});

// Student API
app.use("/api/students", studentRoutes);

// Error handler
app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  },
);

export default app;
