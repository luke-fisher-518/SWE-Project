import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React, { useContext } from 'react';
import UserContext from './UserContext';
import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs'

export default function Navbar() {
    const [ch, setch] = useState(false)
    const username = ["test", "Cade", "Luke", "Michael"]
    const password = ["$2a$10$CwTycUXWue0Thq9StjUM0uDuLhv5HLR6NolzHfzzeGFS7ckdDryDK", "$2a$10$CwTycUXWue0Thq9StjUM0uDuLhv5HLR6NolzHfzzeGFS7ckdDryDK", "$2a$10$CwTycUXWue0Thq9StjUM0uDuLhv5HLR6NolzHfzzeGFS7ckdDryDK", "$2a$10$CwTycUXWue0Thq9StjUM0uDuLhv5HLR6NolzHfzzeGFS7ckdDryDK"]
    const [user, setuser] = useState("")
    const [pass, setpass] = useState("")
    const [status, setstatus] = useState("")
    const { userImage } = useContext(UserContext);
    const [usera, setusera] = useState("")
    if (!ch){


        const check_log = () => {

            const hash_pass = bcrypt.hashSync(pass, '$2a$10$CwTycUXWue0Thq9StjUM0u')
            console.log(hash_pass)
            let alpha = /^[a-zA-Z]+$/;
            if (!alpha.test(user) && !/\d/.test(user)){
                setstatus("Username must contain letters or numbers only.")
                return
            }
            if (!alpha.test(pass) && !/\d/.test(pass)){
                setstatus("Password must contain letters or numbers only.")
                return
            }
            if (user.length < 4 || user.length > 25){
                setstatus("Username must have between 4 and 25 characters.")
                return
            }
            if (pass.length < 4 || pass.length > 25){
                setstatus("Password must have between 4 and 25 characters.")
                return
            }
            let t = false
            let pp = 0
            for (let i = 0; i < username.length; i++) {
                if (username[i] == user){
                    if (password[i] == hash_pass){
                        t = !t
                        pp = i
                        break
                    }
                }
            }
            if (t){
                setuser("")
                setpass("")
                setstatus("")
                setusera(user)
                setch(true)
            }else{
                setstatus("Incorrect Username/Password")
            }
        }

        const check_reg = () => {
            let t = true
            const hash_passr = bcrypt.hashSync(pass, '$2a$10$CwTycUXWue0Thq9StjUM0u')
            let alpha = /^[a-zA-Z]+$/;
            if (!alpha.test(user) && !/\d/.test(user)){
                setstatus("Username must contain letters or numbers only.")
                return
            }
            if (!alpha.test(pass) && !/\d/.test(pass)){
                setstatus("Password must contain letters or numbers only.")
                return
            }
            if (user.length < 4 || user.length > 25){
                setstatus("Username must have between 4 and 25 characters.")
                return
            }
            if (pass.length < 4 || pass.length > 25){
                setstatus("Password must have between 4 and 25 characters.")
                return
            }
            for (let i = 0; i < username.length; i++) {
                if (username[i] == user){
                    t = !t
                    break
                }
            }
            if (t){

                setstatus("Successful Registration")
                console.log("Username: ", user)
                console.log("Password: ", hash_passr)
                username.push(user)
                password.push(pass)
            }else{
                setstatus("Unsuccessful Registration")
            }



        }
        return (

            <div className="Title">
                <h1>SteamTracker</h1>

                <div className="App">

                    <div className="Login/Register">
                        <h1>Login/Register
                        </h1>
                        <div className="User">
                            <input type="text" placeholder="Username"
                                   onChange={(e) => setuser(e.target.value)}/>
                        </div>
                        <div className="Pass">
                            <input type="text" placeholder="Password"
                                   onChange={(e) => setpass(e.target.value)}/>
                        </div>
                        <div className="Status">
                            <label>{status}</label>
                        </div>
                        <div className="LB">
                            <button onClick={check_log}>Login</button>
                        </div>
                        <div className="RB">
                            <button onClick={check_reg}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    if (ch) {
        const check = () => {

            setusera("")
            setch(false)
        }

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
                    <Link to="/" className="site-title">
                        <div className="Butt">
                            <text>Hi {usera}</text>
                            <div className="Button">
                                <button onClick={check}>Logout</button>
                            </div>
                        </div>
                    </Link>

                </ul>


            </nav>
        );
    }

}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props} className={isActive ? "active" : ""}>{children}</Link>
        </li>
    );
}