import express from "express";
import tutorHandler from "./api/tutor/index.ts";

const app = express();
app.use(express.json());

app.all("/api/tutor", (req, res) => tutorHandler(req, res));

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
