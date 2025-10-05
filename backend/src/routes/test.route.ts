import { Router, type Router as ExpressRouter } from "express";
import { beginQuiz, retakeQuiz } from "../controllers/test.controller";
import { submitQuiz } from "../controllers/submit.controller";

const router: ExpressRouter = Router();

router.route("/user-info").get(beginQuiz);
router.route("/retake").get(retakeQuiz);
router.route("/submit").post(submitQuiz);

export default router;