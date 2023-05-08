import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Permet d'utiliser les URLs cryptée (google.com?q=1&b=2)

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "OK" });
});

app.use("/api/v1", router);

export default app;
