import express from "express";
import { USER_ROLE } from "../../types";
import auth from "../../middleware/auth";
import {
  createIssue,
  deleteIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
} from "./issue.controller";

const router = express.Router();

/* Create Issue (auth required) */
router.post("/", auth(), createIssue);

/* Get All Issues (public) */
router.get("/", getAllIssues);

/* Get Single Issue (public) */
router.get("/:id", getSingleIssue);

/* Update Issue (contributor + maintainer) */
router.patch(
  "/:id",
  auth(USER_ROLE.contributor, USER_ROLE.maintainer),
  updateIssue,
);

/* Delete Issue (maintainer only) */
router.delete("/:id", auth(USER_ROLE.maintainer), deleteIssue);

export default router;
