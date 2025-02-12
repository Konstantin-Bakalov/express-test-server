import express, { json } from "express";
import multer from "multer";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

const upload = multer({ dest: "./images" });

const port = process.env.PORT || 3000;

app.post("/image", upload.single("image"), (req, res) => {
  console.log("got something", req.file);
  if (!req.file) {
    res.json({ message: "No file" });
  }
  res.json({ message: "Image received", size: req.file.size });
});

app.post("/qr", (req, res) => {
  const { qrCode } = req.body;
  res.json({ qrCode });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
