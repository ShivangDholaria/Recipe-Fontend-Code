import { Link } from "react-router-dom";
import { MenuData } from "./menuData";
import "./navbarStyle.css";

function Navbar() {
  return (
    <nav className="NavbarItems">
      <h1 className="logo">
        <Link to="/" className="nav-links">
          Recipes <i className="fas fa-hamburger"></i>
        </Link>
      </h1>

      <ul className={"nav-menu"}>
        {MenuData.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.url} className={item.cName} onClick={null}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
