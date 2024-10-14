import { PSM, createWorker } from "tesseract.js";

const cleanText = (text: string) => {
  return text.replace(/\b(eo)\b|\b[eo]\b|©/g, "*").replace(/[\r\n]+|\s+/g, " ");
};

const performOCR = async (image: any) => {
  const worker = await createWorker("eng");
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.AUTO,
    langPath: "eng.traineddata",
  });
  const {
    data: { text },
  } = await worker.recognize(image);

  worker.terminate();
  return text;
};

// import fs from "fs";
// import path from "path";

export const getImageToText = async (
  images: string[]
): Promise<{ imageText: string | null; imageError: string | null }> => {
  try {
    const imagesTexts: string[] = [];
    for (let x = 0; x < images.length; x++) {
      const base64Image = images[x];
      const data = base64Image.replace(/^data:image\/\w+;base64,/, "");
      const dataUri = `data:image/png;base64,${data}`;
      const text = await performOCR(dataUri);

      // const buffer = Buffer.from(data, "base64");
      // const fileName = `image_${x + 1}.png`;
      // // const filePath = path.join(__dirname, "uploads", fileName);
      // const filePath = path.join(__dirname, "../uploads", fileName);
      // fs.writeFileSync(filePath, buffer);

      imagesTexts.push(text);
    }
    const text = cleanText(imagesTexts.join(" "));
    return { imageText: text, imageError: null };
  } catch (error) {
    let errorMessage = "Internal Server Error at: image to text";
    if (typeof error === "string") {
      errorMessage = error.toUpperCase();
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { imageText: null, imageError: errorMessage };
  }
};
