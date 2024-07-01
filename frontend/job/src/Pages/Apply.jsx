import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import { useAuth } from '../Context/AuthUserContext'
import { useParams } from 'react-router';

const Apply = () => {
  const auth = useAuth();
  const params = useParams();
  const id = params.id
  const [jobs , setJobs] = useState("")
  const handlea = async(e)=>{
    e.preventDefault();
    console.log("sexyyy");
    const response = await fetch(`http://localhost:1042/api/apply/${id}` , {
      method:"PUT",
      credentials:"include"
    })
    .then((res)=>{
      res.json()
    })
    .then((res)=>{
      console.log(res);
    })
  }
  useEffect(()=>{
    const find = async()=>{
      const rep = await fetch(`http://localhost:1042/api/job/${id}` , {
        method:"GET"
      })
      .then((res)=>res.json())
      .then((res)=>{console.log(res)
      setJobs(res)}
    )
    }
    find();
    
  } , [])
  return (
    <div>
    <Navbar></Navbar>
    <div className="mainapply">
      <div className="container">
        <h1>{jobs?.name}</h1>
        <h2>{jobs?.jobtitle}</h2>
        <h2>{jobs?.workinglocation}</h2>
        <h2>{jobs?.status}</h2>
        <h2>Location:- {jobs?.state}, {jobs?.country} </h2>
        <h2>Salary : {jobs?.salary} K/year</h2>
        <h2>Contact info:-{jobs?.contact}</h2>
        <div className="divi">
        <h2>Description</h2>
        <p>{jobs?.description}</p>
        <div className="apply">
          <button onClick={handlea}>Apply</button>
        </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Apply
