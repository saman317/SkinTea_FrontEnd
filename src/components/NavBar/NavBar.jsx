import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import './NavBar.css'; // Import the navbar styles

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <>
      {user ? (
        <nav className="navbar">
          <ul className="navbar-links">
            <li className="navbar-welcome">Welcome, {user.username}</li>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/skintea">All The Tea</Link></li>
            <li><Link to="/skintea/new">New Tea</Link></li>
            <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
          </ul>
        </nav>
      ) : (
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
