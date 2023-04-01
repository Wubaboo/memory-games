import { Link } from "react-router-dom";
import "../styles/header.css";
export default function Header(props) {
  const { routes } = props;
  return (
    <div className="header">
      <Link to="/">
        <h1 className="label">Memory Games</h1>
      </Link>
      <div className="links">
        {routes.map((r, i) => {
          return (
            <Link key={i} className="link" to={r.path}>
              {r.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
