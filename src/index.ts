import app from "./server";
import dotenv from "dotenv";

import config from "./config";

dotenv.config();

app.listen(config.port, () => {
  console.log(`Server en execution sur http://localhost:${config.port}`);
});
