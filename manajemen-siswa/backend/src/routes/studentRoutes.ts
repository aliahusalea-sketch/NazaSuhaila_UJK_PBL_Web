import { Router } from "express";

import {
  getStudents,
  getStudent,
  addStudent,
  editStudent,
  removeStudent,
} from "../controllers/studentController";

const router = Router();

router.get("/", getStudents);
router.get("/:id", getStudent);
router.post("/", addStudent);
router.put("/:id", editStudent);
router.delete("/:id", removeStudent);

export default router;
