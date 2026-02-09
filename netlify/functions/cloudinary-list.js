import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: JSON.stringify({ error: "Méthode non autorisée" }) };
  }

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "carousel/",
      max_results: 100,
      context: true,
    });

    const images = result.resources
      .map((r) => {
        const ctx = r.context?.custom || {};
        return {
          public_id: r.public_id,
          url: cloudinary.url(r.public_id, {
            fetch_format: "auto",
            quality: "auto",
            width: 960,
            crop: "limit",
            secure: true,
          }),
          thumbnail: cloudinary.url(r.public_id, {
            fetch_format: "auto",
            quality: "auto",
            width: 200,
            height: 120,
            crop: "fill",
            secure: true,
          }),
          width: r.width,
          height: r.height,
          caption: ctx.caption || "",
          sort_order: parseInt(ctx.sort_order || "0", 10),
          created_at: r.created_at,
        };
      })
      .sort((a, b) => a.sort_order - b.sort_order);

    return {
      statusCode: 200,
      headers: { "Cache-Control": "public, max-age=30" },
      body: JSON.stringify({ images }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
