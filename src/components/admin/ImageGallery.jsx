import { useState } from "react";

export default function ImageGallery({ images, token, onRefresh }) {
  const [deleting, setDeleting] = useState(null);
  const [reordering, setReordering] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleDelete = async (publicId) => {
    if (!confirm("Supprimer cette image ?")) return;

    setDeleting(publicId);
    setFeedback("");

    try {
      const res = await fetch("/.netlify/functions/cloudinary-delete", {
        method: "POST",
        headers: { Authorization: token },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!res.ok) throw new Error("Erreur suppression");

      setFeedback("Image supprimee");
      onRefresh();
    } catch (err) {
      setFeedback(err.message);
    } finally {
      setDeleting(null);
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  const handleMove = async (index, direction) => {
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= images.length) return;

    setReordering(true);
    setFeedback("");

    const reordered = [...images];
    [reordered[index], reordered[swapIndex]] = [reordered[swapIndex], reordered[index]];

    const payload = reordered.map((img, i) => ({
      public_id: img.public_id,
      sort_order: i,
      caption: img.caption,
    }));

    try {
      const res = await fetch("/.netlify/functions/cloudinary-reorder", {
        method: "POST",
        headers: { Authorization: token },
        body: JSON.stringify({ images: payload }),
      });

      if (!res.ok) throw new Error("Erreur reordering");

      setFeedback("Ordre mis a jour");
      onRefresh();
    } catch (err) {
      setFeedback(err.message);
    } finally {
      setReordering(false);
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  if (images.length === 0) {
    return (
      <div style={{
        padding: "40px 20px", textAlign: "center",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
          Aucune image dans le carrousel
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 16,
      }}>
        <div style={{
          fontSize: 10, letterSpacing: 3, color: "#cf9b3b",
          textTransform: "uppercase", fontWeight: 600,
        }}>
          Images ({images.length})
        </div>
        {feedback && (
          <div style={{
            fontSize: 11, color: feedback.includes("Erreur") ? "#ef4444" : "#4ade80",
            fontWeight: 500,
          }}>
            {feedback}
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {images.map((img, i) => (
          <div key={img.public_id} style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            overflow: "hidden", position: "relative",
            opacity: deleting === img.public_id ? 0.4 : 1,
            transition: "opacity 0.3s",
          }}>
            <img
              src={img.thumbnail}
              alt={img.caption || "Image carrousel"}
              style={{
                width: "100%", height: 140, objectFit: "cover",
                display: "block", background: "#0a0a0a",
              }}
            />

            <div style={{ padding: "10px 12px" }}>
              {img.caption && (
                <div style={{
                  fontSize: 11, color: "rgba(255,255,255,0.65)",
                  marginBottom: 8, lineHeight: 1.4,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {img.caption}
                </div>
              )}

              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => handleMove(i, -1)}
                  disabled={i === 0 || reordering}
                  title="Monter"
                  style={{
                    flex: 1, padding: "6px 0", background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)", color: i === 0 ? "rgba(255,255,255,0.15)" : "#fff",
                    cursor: i === 0 ? "not-allowed" : "pointer", fontSize: 14,
                  }}
                >
                  &#8593;
                </button>
                <button
                  onClick={() => handleMove(i, 1)}
                  disabled={i === images.length - 1 || reordering}
                  title="Descendre"
                  style={{
                    flex: 1, padding: "6px 0", background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: i === images.length - 1 ? "rgba(255,255,255,0.15)" : "#fff",
                    cursor: i === images.length - 1 ? "not-allowed" : "pointer", fontSize: 14,
                  }}
                >
                  &#8595;
                </button>
                <button
                  onClick={() => handleDelete(img.public_id)}
                  disabled={deleting === img.public_id}
                  title="Supprimer"
                  style={{
                    flex: 1, padding: "6px 0", background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444",
                    cursor: "pointer", fontSize: 13,
                  }}
                >
                  &#10005;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
