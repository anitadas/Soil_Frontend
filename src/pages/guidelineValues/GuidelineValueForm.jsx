import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GuidelineValueForm = () => {
  const [contaminants, setContaminants] = useState([]);
  const [soilTypes, setSoilTypes] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [form, setForm] = useState({
    contaminantId: "",
    soilTypeId: "",
    pathwayId: "",
    guideline_Value: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://13.203.223.105/api/contaminants")
      .then((res) => setContaminants(res.data));
    axios
      .get("http://13.203.223.105/api/soiltypes")
      .then((res) => setSoilTypes(res.data));
    axios
      .get("http://13.203.223.105/api/pathways")
      .then((res) => setPathways(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      contaminantId: parseInt(form.contaminantId),
      soilTypeId: parseInt(form.soilTypeId),
      pathwayId: parseInt(form.pathwayId),
      guideline_Value: parseFloat(form.guideline_Value),
    };

    try {
      await axios.post("http://13.203.223.105/api/guidelinevalues", payload);
      toast.success("Guideline value added successfully");
      setTimeout(() => navigate("/guideline-values"), 1500);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("This guideline combination already exists.");
      } else {
        toast.error("Failed to add guideline value. Please try again.");
      }
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
        Add Guideline Value
      </h2>
      <form onSubmit={handleSubmit}>
        <FormGroup
          label="Contaminant"
          name="contaminantId"
          value={form.contaminantId}
          options={contaminants}
          onChange={handleChange}
        />
        <FormGroup
          label="Soil Type"
          name="soilTypeId"
          value={form.soilTypeId}
          options={soilTypes}
          onChange={handleChange}
        />
        <FormGroup
          label="Pathway"
          name="pathwayId"
          value={form.pathwayId}
          options={pathways}
          onChange={handleChange}
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
          {loading ? "Adding..." : "Add Guideline Value"}
        </button>
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

export default GuidelineValueForm;
