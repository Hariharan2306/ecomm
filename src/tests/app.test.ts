import request from "supertest";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from "../Database/connections";
import indexRoute from "../Routers/indexRoute";
import bodyParser from "body-parser";

jest.mock("./Database/connections", () => ({
  connectDatabase: jest.fn(),
}));

jest.mock("./Routers/indexRoute", () => jest.fn());

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.options("*", cors());
connectDatabase();
app.use("/", indexRoute);

describe("Express Server", () => {
  it("should connect to the database", async () => {
    expect(connectDatabase).toHaveBeenCalled();
  });

  it("should respond with a 200 status on root path", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  it("should respond with 'Express is listening' on starting", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Server is running.");
  });
});
