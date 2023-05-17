import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "../config";

const protect = (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }

  const [, jwtToken] = token.split(" ");
  if (!jwtToken) {
    console.log(
      "damm what token to you send me ?... Oww my god. jwtToken is null"
    );

    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }
  try {
    const payload = jwt.verify(jwtToken, config.secrets.jwt);
    req.user = payload;
    next();
  } catch (err) {
    console.error(err);
    res.status(401);
    res.json({ message: "Token Invalide" });
    return;
  }
};

export default { protect };

const handleInputErrors = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  console.log("error: ", errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export { protect, handleInputErrors };
