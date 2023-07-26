import React from "react";
import { NavLink } from "react-router-dom";
import '../App.css';

export default function PageNavLinks() {
    return (
        <div className="navigation">
            <NavLink to="/" className="navButtons">Home</NavLink>
            <NavLink to="/client" className="navButtons">Client Page</NavLink>
            <NavLink to="/petsitters" className="navButtons">View Pet Sitters</NavLink>
        </div>
    )
}