import React, { useState } from "react";

export default function Logout() {
    const [st, setst] = useState(false)
    const ch = () =>{

        setst(true)
    }
    if (st){
        return Logout = null
    }
    return(
    <div className="App">
        <h1>Logout
        </h1>
        <div className="LB">
            <button onClick={ch}>Logout</button>
        </div>
    </div>
    );
}