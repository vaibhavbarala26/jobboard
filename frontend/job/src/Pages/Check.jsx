import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import { useParams } from 'react-router'
import Applicants from './Applicants'
const Check = () => {
  const params=useParams()
  const id = params.id
  const [job , setJob] = useState("")
  useEffect(()=>{
    const jobbyid = async() =>{
      const resp = await fetch(`http://localhost:1042/api/job/${id}`,{
        method:"GET",
      })
      .then((res)=>res.json())
      .then((res)=>{console.log(res.applicants)
        setJob(res.applicants)
      })
    }
    jobbyid();
  } , [])
  return (
    <div>
      <Navbar></Navbar>
      <div className="check">
        {job?.length>0 && job?.map((jo)=>(
        <div className="applicants">
          <Applicants data={jo} key={jo?._id}></Applicants>
        </div>
        ))}

      </div>
    </div>
  )
}

export default Check
