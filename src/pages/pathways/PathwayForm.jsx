import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PathwayForm = () => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5091/api/pathways", form);
      navigate("/pathways");
    } catch {
      setError("Failed to add pathway");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "60px auto",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 4px 24px rgba(49,130,206,0.10)",
        padding: 36,
      }}>
      <h2 style={{ color: "#2563eb", marginBottom: 28, textAlign: "center" }}>
        Add Pathway
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
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: 7,
              fontSize: 16,
              marginTop: 4,
            }}
            placeholder="Enter pathway name"
          />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 16,
              marginBottom: 8,
              display: "block",
            }}>
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: 7,
              fontSize: 16,
              marginTop: 4,
              resize: "vertical",
            }}
            placeholder="Enter pathway description (optional)"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            padding: "12px 0",
            fontWeight: 600,
            fontSize: 17,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 1px 4px rgba(37,99,235,0.08)",
            marginTop: 8,
          }}>
          {loading ? "Adding..." : "Add Pathway"}
        </button>
        {error && (
          <div style={{ color: "#e53e3e", marginTop: 16, textAlign: "center" }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default PathwayForm;
