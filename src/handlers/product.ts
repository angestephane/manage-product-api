import { Request, Response } from "express";
import { validationResult } from "express-validator";

const updateProduct = (req: Request, res: Response) => {
  const errors = validationResult(req);
  console.log("error: ", errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

export { updateProduct };
