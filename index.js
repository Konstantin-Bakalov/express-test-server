import express, { json } from "express";
import multer from "multer";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

const upload = multer({ dest: "./images" });
app.use(express.json({ limit: "20mb" }));
const port = process.env.PORT || 3000;

app.post("/image", upload.single("image"), (req, res) => {
  console.log("got something", req.file);
  if (!req.file) {
    res.json({ message: "No file" });
  }
  res.json({ message: "Image received", size: req.file.size });
});

// Route to handle image upload
app.post("/image64", async (req, res) => {
  try {
    const { image } = req.body; // Base64 string
    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Extract Base64 data (remove 'data:image/jpeg;base64,' prefix if exists)
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    console.log('buffer', buffer);
    // Save file to server
    const fileName = `upload_${Date.now()}.jpg`;

    res.json({ message: "Image uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving image" });
  }
});

app.post("/qr", (req, res) => {
  const { qrCode } = req.body;
  res.json({ qrCode });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
