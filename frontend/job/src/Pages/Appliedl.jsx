import React from 'react'
import { CiHeart } from "react-icons/ci"
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthUserContext'

const Appliedl = ({ data }) => {
    console.log(data);
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
                            
                        </div>
                        </Link>
                    </div>
                </div>
            
        </div>
    )
}

export default Appliedl
