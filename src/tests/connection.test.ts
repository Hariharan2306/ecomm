import mongoose from "mongoose";
import { connectDatabase } from "../Database/connections";

jest.mock("mongoose");

describe("connectDatabase", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should connect to MongoDB successfully", async () => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce(true);

    await connectDatabase();

    expect(mongoose.connect).toHaveBeenCalledWith(
      "mongodb://localhost:27017/Hackathon"
    );
    expect(console.log).toHaveBeenCalledWith("MongoDB Connected...");
  });

  it("should handle MongoDB connection failure", async () => {
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(
      new Error("Connection error")
    );

    console.log = jest.fn();

    await connectDatabase();

    expect(mongoose.connect).toHaveBeenCalledWith(
      "mongodb://localhost:27017/Hackathon"
    );

    expect(console.log).toHaveBeenCalledWith(
      "Error connecting to MongoDB:",
      new Error("Connection error")
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
