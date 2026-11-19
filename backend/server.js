
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoute.js";
import courseRoutes from "./routes/courseRoute.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

// SESSION
app.use(
  session({
    name: "desinerz.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),

    cookie: {
      httpOnly: true,
      secure: false, // Development only
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


// ADMIN ROUTES
app.use("/api/admin", adminRoutes);

app.use("/api/courses", courseRoutes);
// SERVER
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
