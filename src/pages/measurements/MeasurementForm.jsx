import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MeasurementForm = () => {
  const [contaminants, setContaminants] = useState([]);
  const [soilTypes, setSoilTypes] = useState([]);
  const [form, setForm] = useState({
    contaminantId: "",
    soilTypeId: "",
    measuredValue: "",
  });
  console.log(form);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://13.203.223.105/api/contaminants")
      .then((res) => setContaminants(res.data));
    axios
      .get("http://13.203.223.105/api/soiltypes")
      .then((res) => setSoilTypes(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://13.203.223.105/api/measurements", form);
      navigate("/measurements");
    } catch {
      setError("Failed to add measurement");
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
        Add Measurement
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
            Contaminant
          </label>
          <select
            name="contaminantId"
            value={form.contaminantId}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: 7,
              fontSize: 16,
              marginTop: 4,
            }}>
            <option value="">Select contaminant</option>
            {contaminants.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 22 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 16,
              marginBottom: 8,
              display: "block",
            }}>
            Soil Type
          </label>
          <select
            name="soilTypeId"
            value={form.soilTypeId}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: 7,
              fontSize: 16,
              marginTop: 4,
            }}>
            <option value="">Select soil type</option>
            {soilTypes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 22 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 16,
              marginBottom: 8,
              display: "block",
            }}>
            Measured Value
          </label>
          <input
            type="number"
            name="measuredValue"
            value={form.measuredValue}
            onChange={handleChange}
            required
            step="0.0001"
            min="0"
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: 7,
              fontSize: 16,
              marginTop: 4,
            }}
            placeholder="Enter measured value"
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
          {loading ? "Adding..." : "Add Measurement"}
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

export default MeasurementForm;
