import React from "react";
import { NavLink } from "react-router-dom";
import '../App.css';

export default function PageNavLinks() {

    return (
        <div className="navigation">
            <NavLink to="/" className="navButtons">Home</NavLink>
            <NavLink to="/petsitterpage" className="navButtons">Petsitter Account</NavLink>
            <NavLink to="/clientpage" className="navButtons">Client Account</NavLink>
            <NavLink to="/petsitterspage" className="navButtons">View Pet Sitters</NavLink>
            <NavLink to="/conversationspage" className="navButtons">Messages</NavLink>
        </div>
    )
}