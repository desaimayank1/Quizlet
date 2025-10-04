"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_controller_1 = require("../controllers/test.controller");
const router = (0, express_1.Router)();
router.route("/user-info").get(test_controller_1.beginQuiz);
// router.route("/retake").post(completeUpload);
// router.route("/submit").post(collectionDeletion);
exports.default = router;
