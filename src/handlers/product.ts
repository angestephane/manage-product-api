import { Request, Response } from "express";
import prisma from "../db";

// Get all products of the current user
const getProducts = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  return res.json({ data: user.products });
};

// get one product of the current user
const getProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      authorId: req.user.id,
    },
  });

  return res.json({ data: product });
};

// let current user to create a product
const createProduct = async (req: Request, res: Response, next: any) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        authorId: req.user.id,
      },
    });

    return res.json({ data: product });
  } catch (e) {
    next(e);
  }
};

// let current user to update a product
const updateProduct = async (req: Request, res: Response) => {
  const newProduct = await prisma.product.update({
    where: {
      id_authorId: {
        id: req.params.id,
        authorId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  return res.json({ data: newProduct });
};

// let current user to delete a product
const deleteProduct = async (req: Request, res: Response) => {
  const productDeleted = await prisma.product.delete({
    where: {
      id_authorId: {
        id: req.params.id,
        authorId: req.user.id,
      },
    },
  });

  return res.json({ data: productDeleted });
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
