import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MeasurementEdit = () => {
  const { id } = useParams();
  const [contaminants, setContaminants] = useState([]);
  const [soilTypes, setSoilTypes] = useState([]);
  const [form, setForm] = useState({
    contaminantId: "",
    soilTypeId: "",
    measuredValue: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5091/api/contaminants")
      .then((res) => setContaminants(res.data));
    axios
      .get("http://localhost:5091/api/soiltypes")
      .then((res) => setSoilTypes(res.data));
    axios
      .get(`http://localhost:5091/api/measurements/${id}`)
      .then((res) => {
        setForm({
          contaminantId: res.data.contaminantId,
          soilTypeId: res.data.soilTypeId,
          measuredValue: res.data.measuredValue,
        });
      })
      .catch(() => setError("Failed to fetch measurement"));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.put(`http://localhost:5091/api/measurements/${id}`, {
        id,
        ...form,
      });
      navigate("/measurements");
    } catch (err) {
      setError("Failed to update measurement");
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
        Edit Measurement
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
            background: "#3182ce",
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

export default MeasurementEdit;
