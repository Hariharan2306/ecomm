import users from "../models/userModel";

export type CreateUserProps = {
  userName: string;
  fullName: string;
  email: string;
  password: string;
};

export const createUserService = async ({
  userName,
  fullName,
  email,
  password,
}: CreateUserProps) => {
  try {
    await users.create({ userName, fullName, email, password });
  } catch (e: any) {
    console.log(e);
    throw new Error(`Failed while creating user: ${e.message}`);
  }
};
export const deleteUserService = async (userName: string) => {
  try {
    await users.deleteOne({ userName });
  } catch (e: any) {
    console.log(e);
    throw new Error(`Failed while deleting user: ${e.message}`);
  }
};
export const updateUserService = async (userMail: string) => {
  try {
    const userData = await users.findOne({ userMail });
    if (!userData) throw new Error(`No user found with email: ${userMail}`);
    await users.updateOne(
      { email: userMail },
      { $set: { ...userData, password: "123456" } }
    );
  } catch (e: any) {
    console.log(e);
    throw new Error(`Failed while updating user: ${e.message}`);
  }
};
export const fetchUserService = async (userName: string) => {
  try {
    const userData = await users.findOne({ userName });
    return userData;
  } catch (e: any) {
    console.log(e);
    throw new Error(`Failed while fetching user: ${e.message}`);
  }
};
