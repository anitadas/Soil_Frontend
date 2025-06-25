import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PathwayEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5091/api/pathways/${id}`)
      .then((res) =>
        setForm({ name: res.data.name, description: res.data.description })
      )
      .catch(() => setError("Failed to fetch pathway"));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.put(`http://localhost:5091/api/pathways/${id}`, {
        id,
        ...form,
      });
      navigate("/pathways");
    } catch (err) {
      setError("Failed to update pathway");
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
      <h2 style={{ color: "#2d3748", marginBottom: 28, textAlign: "center" }}>
        Edit Pathway
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
              outline: "none",
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
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
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
            placeholder="Enter pathway description"
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
          {loading ? "Saving..." : "Save Changes"}
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

export default PathwayEdit;
