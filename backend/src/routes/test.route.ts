import { Router, type Router as ExpressRouter } from "express";
import { beginQuiz } from "../controllers/test.controller";
import { submitQuiz } from "../controllers/submit.controller";

const router: ExpressRouter = Router();

router.route("/user-info").get(beginQuiz);
router.route("/submit").post(submitQuiz);

export default router;