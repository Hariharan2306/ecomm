import {
  createUserService,
  deleteUserService,
  updateUserService,
  fetchUserService,
} from "../Services/userServices";
import users from "../models/userModel";

jest.mock("../models/userModel");

describe("User Services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user successfully", async () => {
    const userData = {
      userName: "abc",
      fullName: "abc",
      email: "abc@example.com",
      password: "password123",
    };

    (users.create as jest.Mock).mockResolvedValueOnce(userData);

    await expect(createUserService(userData)).resolves.not.toThrow();
    expect(users.create).toHaveBeenCalledWith(userData);
  });

  it("should throw an error if user creation fails", async () => {
    const userData = {
      userName: "abc",
      fullName: "abc",
      email: "abc@example.com",
      password: "password123",
    };

    const error = new Error("Database error");
    (users.create as jest.Mock).mockRejectedValueOnce(error);

    await expect(createUserService(userData)).rejects.toThrow(
      "Failed while creating user: Database error"
    );
  });

  it("should delete a user successfully", async () => {
    const userName = "abc";

    (users.deleteOne as jest.Mock).mockResolvedValueOnce({});

    await expect(deleteUserService(userName)).resolves.not.toThrow();
    expect(users.deleteOne).toHaveBeenCalledWith({ userName });
  });

  it("should throw an error if user deletion fails", async () => {
    const userName = "abc";

    const error = new Error("Database error");
    (users.deleteOne as jest.Mock).mockRejectedValueOnce(error);

    await expect(deleteUserService(userName)).rejects.toThrow(
      "Failed while deleting user: Database error"
    );
  });

  it("should update a user's password successfully", async () => {
    const userMail = "abc@example.com";

    const mockUser = {
      userName: "abc",
      fullName: "abc",
      email: userMail,
      password: "oldpassword",
    };
    (users.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
    (users.updateOne as jest.Mock).mockResolvedValueOnce({});

    await expect(updateUserService(userMail)).resolves.not.toThrow();
    expect(users.updateOne).toHaveBeenCalledWith(
      { email: userMail },
      { $set: { ...mockUser, password: "123456" } }
    );
  });

  it("should throw an error if no user is found to update", async () => {
    const userMail = "non_existing@example.com";

    (users.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(updateUserService(userMail)).rejects.toThrow(
      "Failed while updating user: No user found with email: non_existing@example.com"
    );
  });

  it("should fetch a user successfully", async () => {
    const userName = "abc";

    const mockUser = {
      userName,
      fullName: "abc",
      email: "abc@example.com",
      password: "password123",
    };
    (users.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await fetchUserService(userName);
    expect(result).toEqual(mockUser);
    expect(users.findOne).toHaveBeenCalledWith({ userName });
  });

  it("should throw an error if fetching a user fails", async () => {
    const userName = "abc";

    const error = new Error("Database error");
    (users.findOne as jest.Mock).mockRejectedValueOnce(error);

    await expect(fetchUserService(userName)).rejects.toThrow(
      "Failed while fetching user: Database error"
    );
  });
});
