import sharp from "sharp";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {

    const path = files.image.filepath;

    const image = sharp(path);

    const meta = await image.metadata();

    const width = meta.width;
    const height = meta.height;

    // center crop (portrait style)
    const size = Math.min(width, height);

    const cropped = await image
      .extract({
        left: (width - size)/2,
        top: (height - size)/2,
        width: size,
        height: size
      })
      .resize(1000,1000)
      .png()
      .toBuffer();

    res.setHeader("Content-Type","image/png");
    res.send(cropped);

  });
}
