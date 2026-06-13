import { pool } from "../../db";

/* CREATE */
export const createIssueService = async (
  payload: any,
  reporterId: number
) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
    INSERT INTO issues (title, description, type, reporter_id)
    VALUES ($1,$2,$3,$4)
    RETURNING id, title, description, type, status, reporter_id, created_at, updated_at
    `,
    [title, description, type, reporterId]
  );

  return result.rows[0];
};

/* GET ALL (NO JOIN — manual fetch user) */
export const getAllIssuesService = async (
  sort = "newest",
  type?: string,
  status?: string
) => {
  let query = `SELECT * FROM issues`;
  const values: any[] = [];
  const conditions: string[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (conditions.length) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query +=
    sort === "oldest"
      ? " ORDER BY created_at ASC"
      : " ORDER BY created_at DESC";

  const issues = await pool.query(query, values);

  const result = [];

  for (const issue of issues.rows) {
    const user = await pool.query(
      `SELECT id, name, role FROM users WHERE id=$1`,
      [issue.reporter_id]
    );

    result.push({
      ...issue,
      reporter: user.rows[0],
    });
  }

  return result;
};

/* GET SINGLE */
export const getSingleIssueService = async (id: number) => {
  const issue = await pool.query(
    `SELECT * FROM issues WHERE id=$1`,
    [id]
  );

  if (!issue.rows.length) {
    throw new Error("Issue not found");
  }

  const user = await pool.query(
    `SELECT id,name,role FROM users WHERE id=$1`,
    [issue.rows[0].reporter_id]
  );

  return {
    ...issue.rows[0],
    reporter: user.rows[0],
  };
};

/* UPDATE */
export const updateIssueService = async (
  id: number,
  payload: any,
  user: any
) => {
  const issue = await pool.query(
    `SELECT * FROM issues WHERE id=$1`,
    [id]
  );

  if (!issue.rows.length) {
    throw new Error("Issue not found");
  }

  const data = issue.rows[0];

  // contributor rule
  if (user.role === "contributor") {
    if (data.reporter_id !== user.id) {
      throw new Error("Not allowed");
    }

    if (data.status !== "open") {
      throw new Error("Only open issues editable");
    }
  }

  const updated = await pool.query(
    `
    UPDATE issues
    SET title=$1, description=$2, type=$3, updated_at=NOW()
    WHERE id=$4
    RETURNING *
    `,
    [
      payload.title,
      payload.description,
      payload.type,
      id,
    ]
  );

  return updated.rows[0];
};

/* DELETE */
export const deleteIssueService = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM issues WHERE id=$1 RETURNING *`,
    [id]
  );

  if (!result.rows.length) {
    throw new Error("Issue not found");
  }

  return true;
};

export const issueService = {
  createIssueService,
  deleteIssueService,
  getAllIssuesService,
  getSingleIssueService,
  updateIssueService,
};