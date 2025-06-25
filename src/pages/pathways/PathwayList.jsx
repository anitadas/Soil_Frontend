import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const PathwayList = () => {
  const [pathways, setPathways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchPathways();
    // eslint-disable-next-line
  }, []);

  const fetchPathways = () => {
    setLoading(true);
    axios
      .get("http://localhost:5091/api/pathways")
      .then((res) => {
        setPathways(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch pathways");
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pathway?"))
      return;
    setDeleting(id);
    try {
      await axios.delete(`http://localhost:5091/api/pathways/${id}`);
      setPathways((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("Failed to delete pathway");
    }
    setDeleting(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red", margin: 24 }}>{error}</div>;

  return (
    <div>
      <Navbar />
      <div
        style={{
          maxWidth: 900,
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
            Pathways
          </h2>
          <Link to="/pathways/new">
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
              + Add Pathway
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
                Description
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
            {pathways.map((p, i) => (
              <tr
                key={p.id}
                style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                <td
                  style={{
                    padding: "16px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {p.id}
                </td>
                <td
                  style={{
                    padding: "16px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {p.name}
                </td>
                <td
                  style={{
                    padding: "16px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {p.description}
                </td>
                <td
                  style={{
                    padding: "16px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {p.createdAt}
                </td>
                <td
                  style={{
                    padding: "16px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {p.updatedAt}
                </td>
                <td
                  style={{
                    padding: "16px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  <Link to={`/pathways/edit/${p.id}`}>
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
                    onClick={() => handleDelete(p.id)}
                    disabled={deleting === p.id}
                    style={{
                      background: "#e53e3e",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "7px 16px",
                      fontWeight: 500,
                      fontSize: 15,
                      cursor: "pointer",
                      opacity: deleting === p.id ? 0.6 : 1,
                    }}>
                    {deleting === p.id ? "Deleting..." : "Delete"}
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

export default PathwayList;
