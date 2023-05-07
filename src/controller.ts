import { Express } from "express";

const createProduct = (_req: Express.Request, _res: Express.Response) => {
  _res.status(200);
  return _res.json({ message: "OK" });
};

export default {
  createProduct,
};
