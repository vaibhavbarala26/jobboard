import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthUserContext'

const Login = () => {
  const [redirect , setRedirect] = useState(false)
  const auth = useAuth()
  const handles = async(e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value
    try{
      await auth?.Login(email , password)
      .then(()=>{
        setRedirect(true);
      })
    }
    catch(e){
    }
  }
  if(redirect){
    return <Navigate to={"/"}></Navigate>
  }
  return (
    <div>
      <div className="bigdiv">
        <div className="smalldiv">
            <h1>Login</h1>
            <form action="" onSubmit={handles}>
                <input type="text" placeholder='email' />
                <input type="password"  placeholder='password'/>
                <div className="button">
                <button>login</button>
                </div>
                <p>not registered ? <Link to={"/register"}>Register</Link></p>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
