import express from "express";

import router from "./router";

const app = express();

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "OK" });
});

app.use("/api/v1", router);

export default app;
