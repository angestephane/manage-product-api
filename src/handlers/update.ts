import { Request, Response } from "express";
import prisma from "../db";

const getUpdates = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      authorId: req.user.id,
    },
    include: {
      update: true,
    },
  });

  const updates = products.reduce((allUpdates, products) => {
    return [...allUpdates, ...products.update];
  }, []);

  return res.json({ data: updates });
};
const getOneUpdate = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = await prisma.update.findFirst({
    where: {
      id,
    },
  });
  return res.json({ data: update });
};
const createUpdates = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const update = await prisma.update.create({
    data: req.body,
  });
  return res.json({ data: update });
};

const updateUpdates = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      authorId: req.user.id,
    },
    include: {
      update: true,
    },
  });

  const updates = products.reduce((allUpdates, products) => {
    return [...allUpdates, ...products.update];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.status(404).json({ message: "Update not found" });
  }

  const update = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  return res.json({ data: update });
};

const deleteUpdates = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      authorId: req.user.id,
    },
    include: {
      update: true,
    },
  });

  const updates = products.reduce((allUpdates, products) => {
    return [...allUpdates, ...products.update];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.status(404).json({ message: "Update not found" });
  }

  const updateDeleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  return res.json({ data: updateDeleted });
};

export {
  getUpdates,
  getOneUpdate,
  createUpdates,
  updateUpdates,
  deleteUpdates,
};
