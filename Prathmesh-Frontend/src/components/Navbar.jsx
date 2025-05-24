// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Transport Broker Panel</h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/deals" className="hover:underline">
            Deals
          </Link>
          <Link to="/vans" className="hover:underline">
            Vans
          </Link>
          <Link to="/owners" className="hover:underline">
            Owners
          </Link>
          <Link to="/payments" className="hover:underline">
            Payments
          </Link>
          <Link to="/owner-dashboard" className="hover:underline">
            Owner View
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
