import { Request, Response } from "express";
import {
  createUserController,
  fetchUserDataController,
  updateUserPasswordController,
  deleteUserController,
} from "../Controllers/userController";
import {
  createUserService,
  fetchUserService,
  updateUserService,
  deleteUserService,
} from "../Services/userServices";

jest.mock("../Services/userServices");

describe("User Controller", () => {
  const mockRes: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  };

  it("should fetch user data successfully", async () => {
    const mockReq: Partial<Request> = {
      params: { userName: "john_doe" },
    };

    const mockData = { userName: "john_doe", fullName: "John Doe" };

    (fetchUserService as jest.Mock).mockResolvedValue(mockData);

    await fetchUserDataController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({
      flag: "Success",
      data: mockData,
    });
  });

  it("should handle error when fetching user data", async () => {
    const mockReq: Partial<Request> = {
      params: { userName: "john_doe" },
    };

    const error = new Error("User not found");
    (fetchUserService as jest.Mock).mockRejectedValue(error);

    await fetchUserDataController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: error.message });
  });

  it("should create user successfully", async () => {
    const mockReq: Partial<Request> = {
      body: {
        userName: "john_doe",
        fullName: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      },
    };

    (createUserService as jest.Mock).mockResolvedValue(undefined);

    await createUserController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ flag: "Success" });
  });

  it("should handle error when creating user", async () => {
    const mockReq: Partial<Request> = {
      body: {
        userName: "john_doe",
        fullName: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      },
    };

    const error = new Error("Error creating user");
    (createUserService as jest.Mock).mockRejectedValue(error);

    await createUserController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: error.message });
  });

  it("should update user password successfully", async () => {
    const mockReq: Partial<Request> = {
      body: {
        userMail: "john.doe@example.com",
      },
    };

    (updateUserService as jest.Mock).mockResolvedValue(undefined);

    await updateUserPasswordController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ flag: "Success" });
  });

  it("should handle error when updating user password", async () => {
    const mockReq: Partial<Request> = {
      body: {
        userMail: "john.doe@example.com",
      },
    };

    const error = new Error("Error updating password");
    (updateUserService as jest.Mock).mockRejectedValue(error);

    await updateUserPasswordController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: error.message });
  });

  it("should delete user successfully", async () => {
    const mockReq: Partial<Request> = {
      params: { userName: "john_doe" },
    };

    (deleteUserService as jest.Mock).mockResolvedValue(undefined);

    await deleteUserController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ flag: "Success" });
  });

  it("should handle error when deleting user", async () => {
    const mockReq: Partial<Request> = {
      params: { userName: "john_doe" },
    };

    const error = new Error("Error deleting user");
    (deleteUserService as jest.Mock).mockRejectedValue(error);

    await deleteUserController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: error.message });
  });
});
