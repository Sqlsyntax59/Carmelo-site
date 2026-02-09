import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handler = async (event) => {
  const password = event.headers.authorization;
  if (password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 401, body: JSON.stringify({ error: "Non autorisé" }) };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Méthode non autorisée" }) };
  }

  try {
    const { images } = JSON.parse(event.body);

    const updates = images.map((img) => {
      const safeCaption = (img.caption || "").replace(/[|=]/g, " ");
      return cloudinary.uploader.explicit(img.public_id, {
        type: "upload",
        context: `caption=${safeCaption}|sort_order=${img.sort_order}`,
      });
    });

    await Promise.all(updates);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
