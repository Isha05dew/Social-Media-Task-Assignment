import express from "express";
import multer from "multer";
import { createUser, getUsers } from "../controller/user.controller.js"

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.array("images", 10), createUser); // Upload up to 10 images
router.get("/", getUsers);

export default router;
