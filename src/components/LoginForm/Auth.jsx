import React, { useEffect, useState } from "react";
import './loginFormCss/loginForm.css'
import { FaUser ,FaLock} from "react-icons/fa";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";


export default function AuthForm(props){
    const [isSignUp , setIsSignUp] = useState(true);
    const [email,setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [error,setError] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        setError('');
        try{
            if (isSignUp){
                await createUserWithEmailAndPassword(auth,email,password)
            }
            else{
                await signInWithEmailAndPassword(auth,email,password)
            }
        }catch(error){

            setError(error.message);
        }
    }

    function toggleAuthMode(){
        setIsSignUp(prev => !prev)
        setError('');
    }

    if (props.user ) {
        return <Redirect to={"/"} />;
    }

    return (
    <div className="page">
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
                {error && <p>{error}</p>} {/* Display error message if it exists */}
                <div className="input-box">
                    <input type="email" name="Email" id="email" 
                    placeholder="Email" required
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                    <FaUser  className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" name="Password" id="password" 
                    placeholder="Password" required
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label htmlFor="remember"><input type="checkbox" name="remember-forget" id="remember" />Remember me</label>
                    <a href="#">Forget password?</a>
                </div>
                <button type="submit">
                    {isSignUp ? "signUp" :"SignIn"}
                </button>
                <div className="register-link" >
                {isSignUp ? <p>Already have an account ? <a href="#" onClick={toggleAuthMode}> Sign In </a></p> : <p>Don't have an account? <a href="#" onClick={toggleAuthMode}>SignUp</a></p> }
                    
                </div>
            </form>
        </div>

    </div>
       
    )
}