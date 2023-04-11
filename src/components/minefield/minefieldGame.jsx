import {createGrid, getCutVertices, removeNode} from "../../utils/gridUtils"
export default function MinefieldGame ({}) {
    const grid = createGrid(4,4)
    removeNode(grid, 5);
    removeNode(grid, 6);
    removeNode(grid, 7);
    console.log(getCutVertices(grid))
    return (<div></div>)
}