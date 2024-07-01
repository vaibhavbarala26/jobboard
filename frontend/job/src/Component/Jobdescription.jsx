import React, { useEffect, useState } from 'react'
import Jobcard from './Jobcard'
import { Link } from 'react-router-dom'
const Jobdescription = () => {
  const [jobs , setJobs] = useState("")
  useEffect(()=>{
    const recentjobs = async()=>{
      const response = await fetch("http://localhost:1042/api/jobdetails" , {
        method:"GET",
      })
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res)
        setJobs(res)
      })
    }
    recentjobs();
  } , [])
  return (
    <div className='descriptionholder'>
      <div className="description">
      <div className="heading">
            <h1>Recent jobs</h1>
            </div>
        <div className="jobs">
            {jobs.length>0 && jobs.map((job)=>(
             <Jobcard data={job}></Jobcard>
            ))}
        </div>
       
      </div>
    </div>
  )
}

export default Jobdescription
