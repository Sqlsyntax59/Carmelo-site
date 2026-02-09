import { useState, useEffect, useCallback } from "react";
import AdminAuth from "./AdminAuth.jsx";
import ImageUploader from "./ImageUploader.jsx";
import ImageGallery from "./ImageGallery.jsx";

export default function AdminPanel() {
  const [token, setToken] = useState(() => sessionStorage.getItem("adminToken") || "");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/.netlify/functions/cloudinary-list?t=${Date.now()}`);
      if (!res.ok) throw new Error("Impossible de charger les images");
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) fetchImages();
  }, [token, fetchImages]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setToken("");
  };

  if (!token) {
    return <AdminAuth onAuth={setToken} />;
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#06060a",
      fontFamily: "'Inter', sans-serif", color: "#fff",
    }}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{-webkit-font-smoothing:antialiased}
        ::selection{background:rgba(207,155,59,0.3);color:#fff}
      `}</style>

      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(6,6,10,0.94)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(207,155,59,0.1)",
        padding: "0 clamp(16px, 4vw, 40px)", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="/" style={{
            fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700,
            letterSpacing: 4, color: "#fff", textDecoration: "none",
          }}>
            C<span style={{ color: "#cf9b3b" }}>Z</span>
          </a>
          <div style={{
            fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase", fontWeight: 600,
          }}>
            Panel Admin
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px", background: "none",
            border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)",
            fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
            cursor: "pointer", fontFamily: "'Inter', sans-serif",
            transition: "all 0.3s",
          }}
        >
          Deconnexion
        </button>
      </header>

      <main style={{
        maxWidth: 900, margin: "0 auto",
        padding: "40px clamp(16px, 4vw, 40px)",
      }}>
        <h1 style={{
          fontFamily: "'Oswald', sans-serif", fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
          marginBottom: 8, color: "#fff",
        }}>
          Gestion du carrousel<span style={{ color: "#cf9b3b" }}>.</span>
        </h1>
        <p style={{
          fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 40, lineHeight: 1.6,
        }}>
          Ajoutez, reorganisez ou supprimez les images affichees dans la galerie du site.
        </p>

        <ImageUploader token={token} onUploadComplete={fetchImages} />

        {loading ? (
          <div style={{
            textAlign: "center", padding: 40,
            color: "rgba(255,255,255,0.35)", fontSize: 13,
          }}>
            Chargement des images...
          </div>
        ) : error ? (
          <div style={{
            padding: "12px 16px", background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444",
            fontSize: 12, textAlign: "center",
          }}>
            {error}
          </div>
        ) : (
          <ImageGallery images={images} token={token} onRefresh={fetchImages} />
        )}
      </main>
    </div>
  );
}
