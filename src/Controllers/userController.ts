import { Request, Response } from "express";

export const fetchUserDataController = (req: Request, res: Response) => {
  try {
    res.status(200).send({ flag: "Success" });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
export const updateUserPasswordController = (req: Request, res: Response) => {
  try {
    res.status(200).send({ flag: "Success" });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
export const createUserController = (req: Request, res: Response) => {
  try {
    res.status(200).send({ flag: "Success" });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
export const deleteUserController = (req: Request, res: Response) => {
  try {
    res.status(200).send({ flag: "Success" });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
