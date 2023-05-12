import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_TOKEN || "my-secret-key"
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
