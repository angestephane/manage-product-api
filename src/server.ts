import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { protect } from "./modules/middleware";
import { connectUser, createUser } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Permet d'utiliser les URLs cryptée (google.com?q=1&b=2)

app.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).json({ message: "This API is working 🚀" });
});

app.use("/api/v1", protect, router);

app.post("/user", createUser);
app.post("/connect-user", connectUser);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Bad request... please check log" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
