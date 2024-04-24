import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React, { useContext } from 'react';
import UserContext from './UserContext';
import LoginScr from "./pages/loginScr";
//import Logout from "./pages/Logout";
import LogoutCopy from "./LogoutCopy";

import { useState, useEffect } from 'react';
import Logout from "./pages/Logout";



export default function Navbar() {
    const { userImage } = useContext(UserContext);
    const [user, setuser] = useState("Login")
    const [ch, setch] = useState(false)

    if (!ch) {
        console.log(Navbar)
        if (LoginScr.toString().length < 25){
            setch(true)
        }
        return (
            <nav className="nav">
                <Link to="/" className="site-title">
                    <img src="./img/st-logo.svg" alt="Steam Tracker Logo"/>
                </Link>
                <ul>
                    <CustomLink to="/Login">Login</CustomLink>
                </ul>
            </nav>
        );
    }
    if (ch) {


        return (
            <nav className="nav">
                <Link to="/" className="site-title">
                    <img src="./img/st-logo.svg" alt="Steam Tracker Logo"/>
                </Link>
                <ul>
                    <CustomLink to="/Trade">Trade</CustomLink>
                    <CustomLink to="/Sell">Sell</CustomLink>
                    <CustomLink to="/Buy">Buy</CustomLink>
                    <CustomLink to="/About">About</CustomLink>
                    <CustomLink to="/User">
                        <img className="user-img" src={userImage} alt="User"/>
                    </CustomLink>
                    <CustomLink to="/Logout">Logout</CustomLink>
                </ul>
            </nav>
        );
    }

}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props} className={isActive ? "active" : ""}>{children}</Link>
        </li>
    );
}
