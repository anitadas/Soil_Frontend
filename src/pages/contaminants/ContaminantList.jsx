import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const ContaminantList = () => {
  const [contaminants, setContaminants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchContaminants();
    // eslint-disable-next-line
  }, []);

  const fetchContaminants = () => {
    setLoading(true);
    axios
      .get("http://13.203.223.105/api/contaminants")
      .then((res) => {
        setContaminants(res.data);
        console.log(res.data, 23423423423);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching contaminants:", err);
        setError("Failed to fetch contaminants");
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contaminant?"))
      return;
    setDeleting(id);
    try {
      await axios.delete(`http://13.203.223.105/api/contaminants/${id}`);
      setContaminants((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Failed to delete contaminant");
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
          maxWidth: 800,
          margin: "48px auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          padding: 40,
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}>
          <h2 style={{ margin: 0, color: "#2d3748", fontSize: 32 }}>
            Contaminants
          </h2>
          <Link to="/new">
            <button
              style={{
                background: "#3182ce",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(49,130,206,0.08)",
              }}>
              + Add Contaminant
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
                  padding: "14px 12px",
                  borderBottom: "2px solid #e2e8f0",
                  textAlign: "left",
                }}>
                ID
              </th>
              <th
                style={{
                  padding: "14px 12px",
                  borderBottom: "2px solid #e2e8f0",
                  textAlign: "left",
                }}>
                Name
              </th>
              <th
                style={{
                  padding: "14px 12px",
                  borderBottom: "2px solid #e2e8f0",
                  textAlign: "left",
                }}>
                Created At
              </th>
              <th
                style={{
                  padding: "14px 12px",
                  borderBottom: "2px solid #e2e8f0",
                  textAlign: "left",
                }}>
                Updated At
              </th>
              <th
                style={{
                  padding: "14px 12px",
                  borderBottom: "2px solid #e2e8f0",
                  textAlign: "left",
                }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contaminants.map((c, i) => (
              <tr
                key={c.id}
                style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                <td
                  style={{
                    padding: "14px 12px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {c.id}
                </td>
                <td
                  style={{
                    padding: "14px 12px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {c.name}
                </td>
                <td
                  style={{
                    padding: "14px 12px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {c.createdAt}
                </td>
                <td
                  style={{
                    padding: "14px 12px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  {c.updatedAt}
                </td>
                <td
                  style={{
                    padding: "14px 12px",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                  <Link to={`/edit/${c.id}`}>
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
                    onClick={() => handleDelete(c.id)}
                    disabled={deleting === c.id}
                    style={{
                      background: "#e53e3e",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "7px 16px",
                      fontWeight: 500,
                      fontSize: 15,
                      cursor: "pointer",
                      opacity: deleting === c.id ? 0.6 : 1,
                    }}>
                    {deleting === c.id ? "Deleting..." : "Delete"}
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

export default ContaminantList;
