import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header>
      <h1>Kikica i Mrvica - Sta Vrtimo <FontAwesomeIcon icon={faCompactDisc}/></h1>
      <nav>
        <Link to="/">Lists</Link> | <Link to="/search">Search</Link>
      </nav>
    </header>
  );
}
