import { Router } from "express";
import {
    getTutores,
    createTutor,
    updateTutor,
    deleteTutor
} from "../controllers/tutorControllers.ts";

const router = Router();

router.get("/", getTutores);
router.post("/", createTutor);
router.put("/:id", updateTutor);
router.delete("/:id", deleteTutor);

export default router;
