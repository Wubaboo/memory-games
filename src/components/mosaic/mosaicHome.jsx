export default function MosaicHome() {
    const [gridSize, setGridSize] = useState(12);
    const [colors, setColors] = useState(3)
    const [startGame, setStartGame] = useState(false);
    const [showTimer, setShowTimer] = useState(false);

    function handleStartGame() {
        setStartGame(!startGame);
      }

    return (
        <div className="mosaic-container">
            <h1 style={{ margin: "1em 0em" }}>Matching</h1>

        </div>
    )
}