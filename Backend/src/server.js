import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv"
import {connectdb} from "../src/lib/db.js"
import cookieParser from "cookie-parser";
const app = express();
dotenv.config()


const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/message", messageRoutes);

app.listen(port, () => {
  console.log(`Your app listening on http://localhost:${port}`);
 connectdb()
});
