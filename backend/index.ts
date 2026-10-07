import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { connectDb } from "./db/connectDb.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(router);
connectDb();
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
