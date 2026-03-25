import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// Middleware:

// Must be first:
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json()); // Parse req JSON body

app.use(rateLimiter); // Rate limiter

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
