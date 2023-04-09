export default function SequenceCell({ selected, idx, onClick, children }) {
  return (
    <li style={{ display: "inline" }}>
      <div
        style={{
          height: 80,
          width: 70,
          padding: 10,
          margin: 2,
          border: `2px solid ${selected ? "red" : "black"}`,
        }}
        onClick={onClick}
      >
        <p style={{ color: selected ? "red" : "black", fontSize: 50 }}>
          {children}
        </p>
      </div>
    </li>
  );
}
