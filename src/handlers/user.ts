import prisma from "../db";
import { Request, Response } from "express";

import { createJWT, comparePassword, hashPassword } from "../modules/auth";

//TODO: Create a user
const createUser = async (req: Request, res: Response) => {
  const hash = hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      userName: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);

  return res
    .status(200)
    .json({ message: "User created successfully", token: token });
};

//TODO: Connect a user

const connectUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      userName: req.body.username,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await comparePassword(req.body.password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Password does not match" });
  }

  const token = createJWT(user);

  return res
    .status(200)
    .json({ message: "User connected successfully", token: token });
};

export { createUser, connectUser };
