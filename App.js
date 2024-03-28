import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App() {
    const username = ["test", "Cade", "Luke", "Michael"]
    const password = ["password", "password", "password", "password"]
    const [user, setuser] = useState("")
    const [pass, setpass] = useState("")
    const [status, setstatus] = useState("")
    const check_log = () => {
        let t = false
        for (let i = 0; i < username.length; i++) {
            if (username[i] == user){
                if (password[i] == pass){
                    t = !t
                    break
                }
            }
        }
        if (t){
            setstatus("Successful Login")
        }else{
            setstatus("Incorrect Username/Password")
        }
    }
    const check_reg = () => {
        let t = true
        for (let i = 0; i < username.length; i++) {
            if (username[i] == user){
                t = !t
                break
            }
        }
        if (t){

            setstatus("Successful Registration")
            console.log("Username: ", user)
            console.log("Password: ", pass)
            username.push(user)
            password.push(pass)
        }else{
            setstatus("Unsuccessful Registration")
        }



    }
  return (

      <div className="Title">
          <h1>SteamTrackers
          </h1>

      <div className="App">

          <div className="Login">
              <h1>Login
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

export default App;
