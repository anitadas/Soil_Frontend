import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContaminantForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5091/api/contaminants", { name });
      navigate("/contaminants");
    } catch (err) {
      setError("Failed to add contaminant");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "60px auto",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        padding: 36,
      }}>
      <h2
        style={{
          color: "#2d3748",
          marginBottom: 28,
          textAlign: "center",
        }}>
        Add Contaminant
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 22 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 16,
              marginBottom: 8,
              display: "block",
            }}>
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: 7,
              fontSize: 16,
              outline: "none",
              marginTop: 4,
            }}
            placeholder="Enter contaminant name"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: "#3182ce",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            padding: "12px 0",
            fontWeight: 600,
            fontSize: 17,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 1px 4px rgba(49,130,206,0.08)",
            marginTop: 8,
          }}>
          {loading ? "Adding..." : "Add Contaminant"}
        </button>
        {error && (
          <div
            style={{
              color: "#e53e3e",
              marginTop: 16,
              textAlign: "center",
            }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContaminantForm;
