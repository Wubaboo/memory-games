import { Link } from "react-router-dom";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import "../styles/header.css";
import { useState } from "react";
export default function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { routes } = props;
  
  function handleClick(e) {
    setAnchorEl(e.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null)
  }
  return (
    <div className="header">
      <Link to="/">
        <h1 className="label">Memory Games</h1>
      </Link>
      <button className="links-button" onClick={handleClick}>
        <i className="fa-bars fa-solid fa-xl menu-icon"></i>
        </button>

      <Menu className="links-menu" open={Boolean(anchorEl)} anchorEl={anchorEl} onClick={handleClose} onClose={handleClose} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        {routes.map((r, i) => {
          return (
            <MenuItem key={i} onClick={handleClose}>
            <Link className="link" to={r.path}>
              {r.label}
            </Link>
            </MenuItem>
          );
        })}
      </Menu>
      
    </div>
  );
}
