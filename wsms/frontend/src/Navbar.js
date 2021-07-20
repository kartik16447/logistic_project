import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Indian Red Cross Society</h1>
      <div className="links">
        <Link to="/">Orders</Link>
        <Link to="/login">Login</Link>
        <Link
          className="button"
          to="/adminPanel"
          style={{
            color: "white",
            backgroundColor: "#ec5990",
            borderRadius: "8px",
          }}
        >
          Admin Panel
        </Link>
        <Link
          className="button"
          to="/createInwardOrder"
          style={{
            color: "white",
            backgroundColor: "#ec5990",
            borderRadius: "8px",
          }}
        >
          Create Inward Order
        </Link>
        <Link
          to="/createOutwardOrder"
          style={{
            color: "white",
            backgroundColor: "#ec5990",
            borderRadius: "8px",
          }}
        >
          Create Outward Order
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
