import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

// styling
import '../NavBar.css';

export default function NavBar() {
  const { loggedIn, handleLogout } = useAppContext();
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout();       // reset login state
    navigate("/login");   // redirect to login page
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav_link">Create your account</Link>
        </li>
        <li>
          <Link to="/events" className="nav_link">Event dashboard</Link>          
        </li>
        <li>
          <Link to="/addevent" className="nav_link">Add an event</Link>          
        </li>
        <li>
          <Link to="/help" className="nav_link">Help</Link>          
        </li>
        
        {loggedIn && (
          <li>
              <button // using in line styling to mirror other nav bar links
              onClick={logoutAndRedirect}
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1.1rem",
                fontFamily: "Arial, Helvetica, sans-serif",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                margin: 0,
                transition: "color 0.2s ease",
               }}
              >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}