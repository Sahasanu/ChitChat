import React from 'react'
import { useState } from 'react'

function Login() {
    const [status, setStatus] = useState("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login or signup based on the status
        if (status === "login") {
            // Call login API
            console.log("Logging in:", { username, password });
        } else {
            // Call signup API
            console.log("Signing up:", { username, password });
        }
    };

    return (
        <div className='Logincontainer'>
            <div className="logo font-bold text-[40px] w-[100%]  pl-[5vw]">ChitChat</div>
            <div className="login border flex-col flex w-[25%] m-auto text-black gap-[3vh] mt-[10vh]">
                <div className="heading ml-[20px]">{status === "login" ? "Log in" : "Sign Up"}</div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder='Username' 
                        className='border w-[90%] ml-auto mr-auto h-[6vh] rounded-[7px] pl-[10px]' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        type="password" 
                        id="password" 
                        placeholder='Password' 
                        className='border w-[90%] ml-auto mr-auto h-[5vh] rounded-[7px] pl-[10px]' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="btn w-[100%] text-center">
                        <button className='bg-[#58fdab] w-[30%] h-[4.5vh] rounded-[5px]' type="submit">
                            {status === "login" ? "Log In" : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="signhead">
                {status === "login" ? "Not Join yet?" : "Already have an account?"} 
                <span className="sign text-blue-400" onClick={() => setStatus(status === "login" ? "signup" : "login")}>
                    {status === "login" ? "Sign Up" : "Log In"}
                </span>
            </div>
        </div>
    )
}

export default Login;