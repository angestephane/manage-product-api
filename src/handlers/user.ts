import prisma from "../db";
import { Request, Response } from "express";

import { createJWT, comparePassword, hashPassword } from "../modules/auth";

//TODO: Create a user
const createUser = async (req: Request, res: Response) => {
  const hash = hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      userName: req.body.userName,
      password: hash,
    },
  });

  const token = createJWT(user);

  return res
    .status(200)
    .json({ message: "User created successfully", data: { token } });
};

//TODO: Connect a user

export { createUser };
