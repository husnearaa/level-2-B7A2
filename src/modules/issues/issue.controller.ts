import type { Request, Response } from "express";
import { createIssueService, deleteIssueService, getAllIssuesService, getSingleIssueService, updateIssueService } from "./issue.service";


// CREATE
export const createIssue = async (req: Request, res: Response) => {
  const data = await createIssueService(req.body, req.user!.id);

  return res.status(201).json({
    success: true,
    message: "Issue created successfully",
    data,
  });
};

// GET ALL
export const getAllIssues = async (req: Request, res: Response) => {
  const { sort, type, status } = req.query;

  const data = await getAllIssuesService(
    sort as string,
    type as string,
    status as string
  );

  return res.status(200).json({
    success: true,
    message: "Issues retrieved successfully",
    data,
  });
};

// GET SINGLE
export const getSingleIssue = async (req: Request, res: Response) => {
  const data = await getSingleIssueService(Number(req.params.id));

  return res.status(200).json({
    success: true,
    message: "Issue retrieved successfully",
    data,
  });
};

// UPDATE
export const updateIssue = async (req: Request, res: Response) => {
  const data = await updateIssueService(
    Number(req.params.id),
    req.body,
    req.user
  );

  return res.status(200).json({
    success: true,
    message: "Issue updated successfully",
    data,
  });
};

// DELETE
export const deleteIssue = async (req: Request, res: Response) => {
  await deleteIssueService(Number(req.params.id));

  return res.status(200).json({
    success: true,
    message: "Issue deleted successfully",
  });
};




export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};