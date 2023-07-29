import React from "react";
import { NavLink } from "react-router-dom";
import '../App.css';

export default function PageNavLinks() {

    return (
        <div className="navigation">
            <NavLink to="/" className="navButtons">Home</NavLink>
            <NavLink to="/petsitter" className="navButtons">Petsitter Account</NavLink>
            <NavLink to="/client" className="navButtons">Client Account</NavLink>
            <NavLink to="/petsitters" className="navButtons">View Pet Sitters</NavLink>
            <NavLink to="/conversations" className="navButtons">Messages</NavLink>
        </div>
    )
}