import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader({ token, onUploadComplete }) {
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    if (file.size > 10 * 1024 * 1024) {
      setError("Fichier trop volumineux (max 10 Mo)");
      return;
    }

    setUploading(true);
    setError("");
    setProgress("Signature en cours...");

    try {
      const signRes = await fetch("/.netlify/functions/cloudinary-sign", {
        method: "POST",
        headers: { Authorization: token },
        body: JSON.stringify({ description, sortOrder: Date.now() }),
      });

      if (!signRes.ok) throw new Error("Erreur de signature");

      const signData = await signRes.json();

      setProgress("Upload en cours...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp);
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);
      formData.append("context", signData.context);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!uploadRes.ok) throw new Error("Erreur upload Cloudinary");

      setDescription("");
      setProgress("");
      onUploadComplete();
    } catch (err) {
      setError(err.message || "Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  }, [token, description, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".avif"] },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        fontSize: 10, letterSpacing: 3, color: "#cf9b3b",
        textTransform: "uppercase", marginBottom: 12, fontWeight: 600,
      }}>
        Ajouter une image
      </div>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description de l'image (optionnel)"
        style={{
          width: "100%", padding: "10px 14px", marginBottom: 12,
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff", fontSize: 13, fontFamily: "'Inter', sans-serif",
          outline: "none", boxSizing: "border-box",
        }}
      />

      <div
        {...getRootProps()}
        style={{
          padding: "40px 20px", textAlign: "center",
          border: `2px dashed ${isDragActive ? "#cf9b3b" : "rgba(255,255,255,0.12)"}`,
          background: isDragActive ? "rgba(207,155,59,0.05)" : "rgba(255,255,255,0.02)",
          cursor: uploading ? "wait" : "pointer",
          transition: "all 0.3s",
        }}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div style={{ color: "#cf9b3b", fontSize: 13 }}>{progress}</div>
        ) : isDragActive ? (
          <div style={{ color: "#cf9b3b", fontSize: 13 }}>Deposez l'image ici...</div>
        ) : (
          <div>
            <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.3 }}>+</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.6 }}>
              Glissez une image ici<br />
              <span style={{ fontSize: 11, opacity: 0.7 }}>ou cliquez pour selectionner (JPG, PNG, WebP — max 10 Mo)</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div style={{
          marginTop: 8, padding: "8px 12px", background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: 12,
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
