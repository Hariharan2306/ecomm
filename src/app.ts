import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from "./Database/connections";
import indexRoute from "./Routers/indexRoute";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.options("*", cors());
connectDatabase();
app.use("/", indexRoute);
app.listen(4000, () => {
  console.log(`Express is listening at PORT:${4000}`);
});
