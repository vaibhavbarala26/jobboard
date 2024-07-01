import React from 'react'
import { CiHeart } from "react-icons/ci"
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthUserContext'
import ReactTimeAgo from 'react-time-ago'
const Jobcard = ({ data }) => {
    const time = Date.now();
    console.log();
    const country = data?.country
    const auth = useAuth();
    console.log(auth?.user);
    const countrygiver = (country) => {
        const y = country.split(" ")
        return (y[1]);
    }
    return (
        <div className='jobcar'>
            
                <div className="card">
                    <div className="imgdiv">
                        <img src="https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png" alt="" />
                    </div>
                    <div className="details">
                    <Link to={`/apply/${data?._id}`}>
                        <div className="name">
                            <span id='companyname'>{data?.name}</span>
                            <span id="test">{data?.jobtitle}</span>
                            <span id='info'>{data?.workinglocation}-{countrygiver(data?.country)}-{data?.status}</span>
                        </div>
                        </Link>
                        {auth?.user?.user?._id === data?.authorid ? <><div className="edit">
                            <Link to={`edit/${data?._id}`}><span id='edit' onClick={()=>{console.log("sexyyy");}}>Edit</span></Link>
                            <Link to={`delete/${data?._id}`}><span id='delete'>Delete</span></Link>
                            </div></> : <><div className="icon" style={{color:"#2863eb"}}>
                            <ReactTimeAgo date={data?.time} locale="en-US"/>
                            </div></>}

                    </div>
                </div>
            
        </div>
    )
}

export default Jobcard
