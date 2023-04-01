export default function NumberGame(props) {
  const { gridSize, grid } = props;
  const gameStyling = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    display: "grid",
  };
  return (
    <div className="number-game" style={gameStyling}>
      {(grid || []).map((row, i) => {
        return row.map((cell, j) => (
          <div key={i + j} className="grid-cell">
            {cell}
          </div>
        ));
      })}
    </div>
  );
}
