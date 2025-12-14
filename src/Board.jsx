import { useState, useEffect } from "react";

export default function Board({ onUnlock }) {
  const gridSize = 6;
  const spacing = 70;
  const radius = 28;

  const COLORS = {
    red: "#E57373",
    blue: "#81A1D1",
    green: "#8ABF9E",
    pink: "#E8A7C3",
    yellow: "#E9D27C",
    black: "#666",
  };

  // preset pieces on the board
  const presetPieces = [
    { row: 0, col: 0, color: COLORS.red, label: "S1A1" },
    { row: 0, col: 3, color: COLORS.green, label: "S1A2" },
    { row: 2, col: 1, color: COLORS.blue, label: "S1FP" },
    { row: 2, col: 5, color: COLORS.red, label: "S2A1" },
    { row: 3, col: 2, color: COLORS.green, label: "S2A2" },
    { row: 3, col: 4, color: COLORS.blue, label: "S2FP" },
    { row: 5, col: 1, color: COLORS.red, label: "S3A1" },
    { row: 4, col: 5, color: COLORS.green, label: "S3A2" },
    { row: 6, col: 3, color: COLORS.blue, label: "S3FP" },
  ];

  const [userPieces, setUserPieces] = useState([
    { row: 4, col: 6, color: COLORS.black },
    { row: 4, col: 4, color: COLORS.black },
    { row: 2, col: 4, color: COLORS.black },
    { row: 2, col: 2, color: COLORS.black },
    { row: 1, col: 1, color: COLORS.black },
    { row: 3, col: 1, color: COLORS.black },
    { row: 4, col: 2, color: COLORS.black },
  ]);

  const intersections = Array.from({ length: gridSize + 1 }, (_, r) =>
    Array.from({ length: gridSize + 1 }, (_, c) => ({ row: r, col: c }))
  ).flat();

  const isUserPieceAt = (row, col) =>
    userPieces.some((p) => p.row === row && p.col === col);

  // Capture logic: check a single preset piece
  const isCaptured = (piece) => {
    const { row, col } = piece;

    const neighbors = [
      { row: row - 1, col }, // up
      { row: row + 1, col }, // down
      { row, col: col - 1 }, // left
      { row, col: col + 1 }, // right
    ];

    return neighbors.every((n) => {
      // Out of bounds = not captured
      if (n.row < 0 || n.row > gridSize || n.col < 0 || n.col > gridSize)
        return true;

      return isUserPieceAt(n.row, n.col);
    });
  };

  // After each user move, check captures
  useEffect(() => {
    presetPieces.forEach((piece) => {
      const id = piece.label.toLowerCase();
      if (isCaptured(piece)) {
        onUnlock(id);
      }
    });
  }, [userPieces]); // trigger when user places stones

  const handleBoardClick = (row, col) => {
    const occupied =
      userPieces.some((p) => p.row === row && p.col === col) ||
      presetPieces.some((p) => p.row === row && p.col === col);

    if (!occupied) {
      setUserPieces((prev) => [...prev, { row, col }]);
    }
  };

  return (
    <svg
      width={spacing * gridSize + spacing}
      height={spacing * gridSize + spacing}
      style={{ overflow: "visible" }}
    >
      {/* grid */}
      {Array.from({ length: gridSize + 1 }).map((_, i) => (
        <>
          <line
            key={"h" + i}
            x1={0}
            y1={i * spacing}
            x2={gridSize * spacing}
            y2={i * spacing}
            stroke="#C5C5C5"
            strokeWidth="2"
          />
          <line
            key={"v" + i}
            x1={i * spacing}
            y1={0}
            x2={i * spacing}
            y2={gridSize * spacing}
            stroke="#C5C5C5"
            strokeWidth="2"
          />
        </>
      ))}

      {/* preset circles */}
      {presetPieces.map((p, i) => (
        <g
          key={i}
          transform={`translate(${p.col * spacing}, ${p.row * spacing})`}
        >
          <circle r={radius} fill={p.color} />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="12"
            fontWeight="600"
          >
            {p.label}
          </text>
        </g>
      ))}

      {/* user black pieces */}
      {userPieces.map((p, i) => (
        <circle
          key={"u" + i}
          cx={p.col * spacing}
          cy={p.row * spacing}
          r={radius}
          fill={COLORS.black}
        />
      ))}

      {/* click zones */}
      {intersections.map((p, i) => (
        <rect
          key={i}
          x={p.col * spacing - spacing / 2}
          y={p.row * spacing - spacing / 2}
          width={spacing}
          height={spacing}
          fill="transparent"
          onClick={() => handleBoardClick(p.row, p.col)}
        />
      ))}
    </svg>
  );
}
