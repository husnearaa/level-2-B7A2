import CookieParser from "cookie-parser";
import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { authRoute } from "./modules/auth/auth.route";
import issueRoute from "./modules/issues/issue.route";
const app: Application = express();

app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.get("/", (req: Request, res: Response) => {
  //res.send("Hello World!");
  res.status(200).json({
       message: "Welcome to Jotter System Backend"
    // author: "backend",
  });
});

// app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/issues", issueRoute);



export default app;



