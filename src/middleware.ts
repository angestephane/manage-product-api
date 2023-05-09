import express from "express";
import jwt from "jsonwebtoken";

const protect = (req: express.Request, res: express.Response, next: any) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }

  const [, jwtToken] = token.split(" ");
  if (!jwtToken) {
    console.log(
      "damm what token to you send meee... Oww my god. jwtToken is null"
    );

    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }
  try {
    const payload = jwt.verify(
      jwtToken,
      process.env.JWT_TOKEN || "my-secret-key"
    );
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
