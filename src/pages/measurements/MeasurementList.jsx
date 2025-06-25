import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const MeasurementList = () => {
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchMeasurements();
    // eslint-disable-next-line
  }, []);

  const fetchMeasurements = () => {
    setLoading(true);
    axios
      .get("http://13.203.223.105/api/measurements")
      .then((res) => {
        setMeasurements(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch measurements");
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this measurement?"))
      return;
    setDeleting(id);
    try {
      await axios.delete(`http://13.203.223.105/api/measurements/${id}`);
      setMeasurements((prev) => prev.filter((m) => m.id !== id));
    } catch {
      setError("Failed to delete measurement");
    }
    setDeleting(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red", margin: 24 }}>{error}</div>;

  return (
    <div>
      <Navbar />{" "}
      <div
        style={{
          maxWidth: 1000,
          margin: "48px auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(49,130,206,0.10)",
          padding: 40,
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}>
          <h2 style={{ margin: 0, color: "#2563eb", fontSize: 32 }}>
            Measurements
          </h2>
          <Link to="/measurements/new">
            <button
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(37,99,235,0.08)",
              }}>
              + Add Measurement
            </button>
          </Link>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              fontSize: 17,
              borderRadius: 12,
              overflow: "hidden",
              background: "#fff",
            }}>
            <thead>
              <tr style={{ background: "#f7fafc" }}>
                <th
                  style={{
                    padding: "16px 14px",
                    borderBottom: "2px solid #e2e8f0",
                    textAlign: "left",
                  }}>
                  ID
                </th>
                <th
                  style={{
                    padding: "16px 14px",
                    borderBottom: "2px solid #e2e8f0",
                    textAlign: "left",
                  }}>
                  Contaminant
                </th>
                <th
                  style={{
                    padding: "16px 14px",
                    borderBottom: "2px solid #e2e8f0",
                    textAlign: "left",
                  }}>
                  Measured Value
                </th>
                <th
                  style={{
                    padding: "16px 14px",
                    borderBottom: "2px solid #e2e8f0",
                    textAlign: "left",
                  }}>
                  Soil Type
                </th>
                <th
                  style={{
                    padding: "16px 14px",
                    borderBottom: "2px solid #e2e8f0",
                    textAlign: "left",
                  }}>
                  Created At
                </th>
                <th
                  style={{
                    padding: "16px 14px",
                    borderBottom: "2px solid #e2e8f0",
                    textAlign: "left",
                  }}>
                  Updated At
                </th>
                <th
                  style={{
                    padding: "16px 14px",
                    borderBottom: "2px solid #e2e8f0",
                    textAlign: "left",
                  }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((m, i) => (
                <tr
                  key={m.id}
                  style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                  <td
                    style={{
                      padding: "16px 14px",
                      borderBottom: "1px solid #e2e8f0",
                    }}>
                    {m.id}
                  </td>
                  <td
                    style={{
                      padding: "16px 14px",
                      borderBottom: "1px solid #e2e8f0",
                    }}>
                    {m.contaminant}
                  </td>
                  <td
                    style={{
                      padding: "16px 14px",
                      borderBottom: "1px solid #e2e8f0",
                    }}>
                    {m.measuredValue}
                  </td>
                  <td
                    style={{
                      padding: "16px 14px",
                      borderBottom: "1px solid #e2e8f0",
                    }}>
                    {m.soilType}
                  </td>
                  <td
                    style={{
                      padding: "16px 14px",
                      borderBottom: "1px solid #e2e8f0",
                    }}>
                    {m.createdAt}
                  </td>
                  <td
                    style={{
                      padding: "16px 14px",
                      borderBottom: "1px solid #e2e8f0",
                    }}>
                    {m.updatedAt}
                  </td>
                  <td
                    style={{
                      padding: "16px 14px",
                      borderBottom: "1px solid #e2e8f0",
                    }}>
                    <Link to={`/measurements/edit/${m.id}`}>
                      <button
                        style={{
                          background: "#3182ce",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "7px 16px",
                          fontWeight: 500,
                          fontSize: 15,
                          cursor: "pointer",
                          marginRight: 12,
                          marginBottom: 4,
                        }}>
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(m.id)}
                      disabled={deleting === m.id}
                      style={{
                        background: "#e53e3e",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "7px 16px",
                        fontWeight: 500,
                        fontSize: 15,
                        cursor: "pointer",
                        opacity: deleting === m.id ? 0.6 : 1,
                      }}>
                      {deleting === m.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeasurementList;
