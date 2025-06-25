import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GuidelineValueEdit = () => {
  const { id } = useParams();
  const [contaminants, setContaminants] = useState([]);
  const [soilTypes, setSoilTypes] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [form, setForm] = useState({
    contaminantId: "",
    soilTypeId: "",
    pathwayId: "",
    guideline_Value: "",
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
      .get("http://localhost:5091/api/pathways")
      .then((res) => setPathways(res.data));
    axios
      .get(`http://localhost:5091/api/guidelinevalues/${id}`)
      .then((res) => {
        setForm({
          contaminantId: res.data.contaminantId,
          soilTypeId: res.data.soilTypeId,
          pathwayId: res.data.pathwayId,
          guideline_Value: res.data.guideline_Value,
        });
      })
      .catch(() => setError("Failed to fetch guideline value"));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      id: parseInt(id),
      contaminantId: parseInt(form.contaminantId),
      soilTypeId: parseInt(form.soilTypeId),
      pathwayId: parseInt(form.pathwayId),
      guideline_Value: parseFloat(form.guideline_Value),
    };

    try {
      await axios.put(
        `http://localhost:5091/api/guidelinevalues/${id}`,
        payload
      );
      toast.success("Guideline value updated successfully");
      setTimeout(() => navigate("/guideline-values"), 1500);
    } catch (err) {
      toast.error("Failed to update guideline value");
      setError("Failed to update guideline value");
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
      <ToastContainer position="top-center" />
      <h2 style={{ color: "#2563eb", marginBottom: 28, textAlign: "center" }}>
        Edit Guideline Value
      </h2>
      <form onSubmit={handleSubmit}>
        <FormGroup
          label="Contaminant"
          name="contaminantId"
          value={form.contaminantId}
          onChange={handleChange}
          options={contaminants}
        />
        <FormGroup
          label="Soil Type"
          name="soilTypeId"
          value={form.soilTypeId}
          onChange={handleChange}
          options={soilTypes}
        />
        <FormGroup
          label="Pathway"
          name="pathwayId"
          value={form.pathwayId}
          onChange={handleChange}
          options={pathways}
        />

        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>Guideline Value</label>
          <input
            type="number"
            name="guideline_Value"
            value={form.guideline_Value}
            onChange={handleChange}
            required
            step="0.0001"
            min="0"
            style={inputStyle}
            placeholder="Enter guideline value"
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

const FormGroup = ({ label, name, value, onChange, options }) => (
  <div style={{ marginBottom: 22 }}>
    <label style={labelStyle}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      style={inputStyle}>
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
  </div>
);

const labelStyle = {
  fontWeight: 500,
  fontSize: 16,
  marginBottom: 8,
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: 7,
  fontSize: 16,
  marginTop: 4,
};

export default GuidelineValueEdit;
