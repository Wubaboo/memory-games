import React from "react";

const SequenceCell = React.forwardRef((props, ref) => (
  <li style={{ display: "inline" }}>
    <div
      style={{
        width: 70,
        padding: 10,
        margin: 2,
        border: `2px solid ${props.selected ? "red" : "black"}`,
      }}
      ref={ref}
    >
      <p style={{ color: props.selected ? "red" : "black", fontSize: 50 }}>
        {props.children}
      </p>
    </div>
  </li>
));

export default SequenceCell;
