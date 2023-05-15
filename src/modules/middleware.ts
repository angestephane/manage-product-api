import { Request, Response } from "express";
import { validationResult } from "express-validator";

const handleInputErrors = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  console.log("error: ", errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export { handleInputErrors };
