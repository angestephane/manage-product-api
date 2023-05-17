import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";

const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    config.secrets.jwt,
    { expiresIn: "1d" }
  );
  return token;
};

const comparePassword = (password: String, hash: String) => {
  return bcrypt.compare(password, hash);
};

const hashPassword = (password: String) => {
  return bcrypt.hashSync(password, 10);
};

export { createJWT, comparePassword, hashPassword };
