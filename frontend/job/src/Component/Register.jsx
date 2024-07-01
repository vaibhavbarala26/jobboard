import React, { useState } from 'react'
import { Link, Navigate, redirect } from 'react-router-dom'
import { useAuth } from '../Context/AuthUserContext';

const Register = () => {
  const [redirec , setRedirec] = useState(false)
  const auth = useAuth()
  const handles = async(e)=>{
    e.preventDefault();
    const name = (e.target[0].value);
    const email = (e.target[1].value);
    const password = (e.target[2].value);
    try{
       await auth?.Register(name , email , password)
      .then(()=>{
        setRedirec(true)
      })
    }
    catch(E){
    }
  }
  if(redirec){
    return <Navigate to={"/"}></Navigate>
  }
  return (
    <div>
      <div className="bigdiv">
        <div className="smalldiv">
            <h1>Register</h1>
            <form action="" onSubmit={handles}>
              <input type="text" placeholder='username' />
                <input type="text" placeholder='email' />
                <input type="password"  placeholder='password'/>
                <div className="button">
                <button>Register</button>
                </div>
                <p> registered ? <Link to={"/login"}>Login</Link></p>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register
