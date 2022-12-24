import express, { Response, Request } from "express";
import * as dotenv from 'dotenv'
import { authRouter } from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewears/error-handler";
import auth from "./middlewears/auth";
import { COOKIE_SECRET } from "./config";
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
dotenv.config()

export const port = process.env.PORT;
export const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  }

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser(COOKIE_SECRET))

app.use('/', authRouter)
app.get('/protected', auth, (req: Request, res: Response) => {
    return res.json({hey: "Howdy"})
})

app.use(errorHandler);