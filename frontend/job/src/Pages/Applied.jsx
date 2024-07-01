import React, { useEffect, useState } from 'react'
import Jobcard from "../Component/Jobcard"
import { Link } from 'react-router-dom'
import Appliedl from './Appliedl'
import { useAuth } from '../Context/AuthUserContext'
import Navbar from '../Component/Navbar'
const Applied = () => {
    const auth = useAuth();
    const jobs = auth?.user?.user?.jobs;
    console.log(auth?.user?.user?.jobs);
  return (
    <>
    <Navbar></Navbar>
     <div className='descriptionholder'>
      <div className="description">
      <div className="heading">
            <h1>Applied jobs</h1>
            </div>
        <div className="jobs">
            {jobs?.length>0 && jobs?.map((job)=>(
                <Appliedl data={job}></Appliedl>
            ))}
        </div>
       
      </div>
    </div>

    </>
  )
}

export default Applied
