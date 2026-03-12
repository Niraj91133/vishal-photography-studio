import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
    res.send("Photography Backend is running...");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT} (on all interfaces)`);
});
