import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
