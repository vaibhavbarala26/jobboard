import React from 'react'
import { useAuth } from '../Context/AuthUserContext'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const auth = useAuth();
  console.log(auth?.user);
  return (
    <div>
      <div className="header">
        <div className="headcontent">
          <Link to={"/"}><span>Job board</span></Link>
          <div className="headbutton">
            {auth?.islogin ?
              <>
                <button id='login' style={{height:"5vh"}} onClick={auth?.Logout}>Logout</button>
                <Link to={"/jobpost"}><button style={{height:"5vh"}}>Post a job</button></Link>
              </>
              :
              <>
                <Link to={"/login"}><button id='login' style={{height:"5vh"}}>Login</button></Link>
                <Link to={"/login"}><button style={{height:"5vh"}}>Post a job</button></Link>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
