import React from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/contaminants", label: "Contaminants" },
  { to: "/soil-types", label: "Soil Types" },
  { to: "/pathways", label: "Pathways" },
  { to: "/guideline-values", label: "Guideline Values" },
  { to: "/measurements", label: "Measurements" },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav
      style={{
        background: "#f7fafc",
        padding: 0,
        marginBottom: 32,
        boxShadow: "0 2px 12px rgba(49,130,206,0.08)",
        borderRadius: 16,
        margin: "24px auto 32px auto",
        maxWidth: 1100,
      }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 64,
          borderRadius: 16,
        }}>
        <Link
          to="/"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
          <span style={{ fontSize: 28, color: "#2563eb" }}>🧪</span> Soil App
        </Link>
        <div style={{ display: "flex", gap: 18 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: isActive ? "#fff" : "#2563eb",
                  background: isActive ? "#2563eb" : "#e3eafc",
                  textDecoration: "none",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 17,
                  padding: "8px 18px",
                  borderRadius: 10,
                  transition: "background 0.2s, color 0.2s",
                  position: "relative",
                  top: isActive ? "1px" : 0,
                  boxShadow: isActive
                    ? "0 1px 4px rgba(37,99,235,0.10)"
                    : "none",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background = isActive ? "#2563eb" : "#c7d2fe")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = isActive ? "#2563eb" : "#e3eafc")
                }>
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
