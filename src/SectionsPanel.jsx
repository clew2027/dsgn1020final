import { useState } from "react";

export default function SectionsPanel({ sections, onToggle }) {
  return (
    <div style={{ padding: "20px", width: "350px" }}>
      {sections.map((s) => (
        <div key={s.id} style={{ marginBottom: "18px" }}>
          {/* SECTION HEADER */}
          <div
            onClick={() => s.unlocked && onToggle(s.id)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "18px",
              fontWeight: "600",
              cursor: s.unlocked ? "pointer" : "default",
              color: s.unlocked ? "#000" : "#888",
              paddingBottom: "6px",
              borderBottom: "1px solid #ddd",
              transition: "color 0.2s ease",
            }}
          >
            <div>
              {s.id.toUpperCase()}: {s.title}
            </div>

            {/* CARET ICON */}
            <div
              style={{
                transition: "transform 0.25s ease",
                transform: s.open ? "rotate(90deg)" : "rotate(0deg)",
                opacity: s.unlocked ? 1 : 0.3,
              }}
            >
              ▶
            </div>
          </div>

          {/* DROPDOWN CONTENT */}
          {s.open && (
            <div
              style={{
                marginTop: "10px",
                paddingLeft: "8px",
                color: "#333",
                fontSize: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div>
                <strong>Description:</strong>
                <p style={{ marginTop: "4px" }}>{s.description}</p>
              </div>

              <div>
                <strong>Preview:</strong>
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    background: `url(${s.preview}) center/cover no-repeat`,
                    borderRadius: "6px",
                    marginTop: "6px",
                  }}
                ></div>
              </div>

              <div>
                <strong>Link:</strong>
                <div style={{ marginTop: "4px" }}>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#337ab7" }}
                  >
                    {s.link}
                  </a>
                </div>
              </div>
              <div>
                <strong>Reading:</strong>
                <p style={{ marginTop: "4px", fontWeight: "bold" }}>{s.readingTitle}</p>
                <ul style={{ marginTop: "4px", paddingLeft: "20px" }}>
                  {s.discussionQuestions.map((question, index) => (
                    <li key={index} style={{ marginBottom: "6px" }}>
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
