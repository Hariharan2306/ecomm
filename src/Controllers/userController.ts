import { Request, Response } from "express";
import {
  CreateUserProps,
  createUserService,
  deleteUserService,
  fetchUserService,
  updateUserService,
} from "../Services/userServices";

export const fetchUserDataController = async (req: Request, res: Response) => {
  try {
    const { userName } = req.params;
    const data = await fetchUserService(userName);
    res.status(200).send({ flag: "Success", data });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
export const updateUserPasswordController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userMail } = req.body;
    await updateUserService(userMail as string);
    res.status(200).send({ flag: "Success" });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { userName, fullName, email, password } = req.body;
    await createUserService({
      userName,
      fullName,
      email,
      password,
    } as CreateUserProps);
    res.status(200).send({ flag: "Success" });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { userName } = req.params;
    await deleteUserService(userName);
    res.status(200).send({ flag: "Success" });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
