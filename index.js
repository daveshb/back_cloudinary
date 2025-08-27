import express from "express";
import cors from "cors";
import multer from "multer";
import {Events} from "./models/event.js"
import cloudinary from "./config/cloudinary.js";
import { dbConnection } from "./config/db.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

app.post("/api/posts", upload.single("image"), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const file = req.file;

    if (!title || !description || !category || !file) {
      return res.status(400).json({ error: "Faltan campos o imagen" });
    }

    // Convertimos el buffer a data URI para subirlo con .upload
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    // save cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "posts",
      use_filename: true,
      resource_type: "image",
    });

    console.log(result.secure_url);

    // save DB

    if (result.secure_url) {
      await dbConnection();

      const newEvent = new Events({
        title,
        description,
        category,
        img: result.secure_url,
      });
      // Save in DB
      await newEvent.save();
      res.status(200).json({ message: "Nueva evento registrada" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error subiendo la imagen" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);
