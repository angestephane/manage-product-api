import jwt from "jsonwebtoken";

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

export default createJWT;
