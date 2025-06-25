import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const SoilTypeList = () => {
  const [soilTypes, setSoilTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchSoilTypes();
    // eslint-disable-next-line
  }, []);

  const fetchSoilTypes = () => {
    setLoading(true);
    axios
      .get("http://13.203.223.105/api/soiltypes")
      .then((res) => {
        setSoilTypes(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch soil types");
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this soil type?"))
      return;
    setDeleting(id);
    try {
      await axios.delete(`http://13.203.223.105/api/soiltypes/${id}`);
      setSoilTypes((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setError("Failed to delete soil type");
    }
    setDeleting(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red", margin: 24 }}>{error}</div>;

  return (
    <div>
      {" "}
      <Navbar />
      <div
        style={{
          maxWidth: 700,
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
            Soil Types
          </h2>
          <Link to="/soil-types/new">
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
              + Add Soil Type
            </button>
          </Link>
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            fontSize: 17,
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
                Name
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
            {soilTypes.map((s, i) => (
              <tr
                key={s.id}
                style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                <td
                  style={{
                    padding: "16px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {s.id}
                </td>
                <td
                  style={{
                    padding: "16px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {s.name}
                </td>
                <td
                  style={{
                    padding: "16px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {s.createdAt}
                </td>
                <td
                  style={{
                    padding: "16px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {s.updatedAt}
                </td>
                <td
                  style={{
                    padding: "16px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  <Link to={`/soil-types/edit/${s.id}`}>
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
                        marginRight: 8,
                      }}>
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(s.id)}
                    disabled={deleting === s.id}
                    style={{
                      background: "#e53e3e",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "7px 16px",
                      fontWeight: 500,
                      fontSize: 15,
                      cursor: "pointer",
                      opacity: deleting === s.id ? 0.6 : 1,
                    }}>
                    {deleting === s.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoilTypeList;
