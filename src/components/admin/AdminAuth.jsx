import { useState } from "react";

export default function AdminAuth({ onAuth }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/.netlify/functions/admin-auth", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        sessionStorage.setItem("adminToken", password);
        onAuth(password);
      } else {
        setError("Mot de passe incorrect");
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#06060a", fontFamily: "'Inter', sans-serif",
    }}>
      <form onSubmit={handleSubmit} style={{
        width: "100%", maxWidth: 380, padding: 32,
        border: "1px solid rgba(207,155,59,0.15)",
        background: "rgba(255,255,255,0.02)",
      }}>
        <div style={{
          fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700,
          letterSpacing: 4, color: "#fff", textTransform: "uppercase",
          marginBottom: 8, textAlign: "center",
        }}>
          C<span style={{ color: "#cf9b3b" }}>Z</span> Admin
        </div>
        <div style={{
          fontSize: 12, color: "rgba(255,255,255,0.45)", textAlign: "center",
          marginBottom: 32, letterSpacing: 1,
        }}>
          Gestion du carrousel
        </div>

        <label style={{
          display: "block", fontSize: 10, letterSpacing: 3,
          color: "#cf9b3b", textTransform: "uppercase", marginBottom: 8, fontWeight: 600,
        }}>
          Mot de passe
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entrez le mot de passe"
          autoFocus
          style={{
            width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)", color: "#fff",
            fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none",
            boxSizing: "border-box", transition: "border-color 0.3s",
          }}
        />

        {error && (
          <div style={{
            marginTop: 12, padding: "8px 12px", background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444",
            fontSize: 12, textAlign: "center",
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          style={{
            width: "100%", marginTop: 20, padding: "14px 0",
            background: loading ? "rgba(207,155,59,0.5)" : "linear-gradient(135deg, #cf9b3b, #a67c2e)",
            color: "#06060a", border: "none", cursor: loading ? "wait" : "pointer",
            fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 700,
            letterSpacing: 3, textTransform: "uppercase",
            transition: "all 0.3s", boxShadow: "0 4px 20px rgba(207,155,59,0.2)",
          }}
        >
          {loading ? "Connexion..." : "Acceder"}
        </button>

        <a
          href="/"
          style={{
            display: "block", textAlign: "center", marginTop: 20,
            color: "rgba(255,255,255,0.35)", fontSize: 11, textDecoration: "none",
            letterSpacing: 1, transition: "color 0.3s",
          }}
        >
          Retour au site
        </a>
      </form>
    </div>
  );
}
