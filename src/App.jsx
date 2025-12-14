import { useState } from "react";
import Board from "./Board";
import SectionsPanel from "./SectionsPanel";
import { SECTIONS } from "./sections";

export default function App() {
  const [sections, setSections] = useState(SECTIONS);

  const unlockSection = (id) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, unlocked: true }
          : s
      )
    );
  };

  const toggleOpen = (id) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, open: !s.open } : s
      )
    );
  };

  return (
    <div style={{ display: "flex", gap: "40px", padding: "100px" }}>
      <Board onUnlock={unlockSection} />

      <SectionsPanel 
        sections={sections}
        onToggle={toggleOpen}
      />
    </div>
  );
}
