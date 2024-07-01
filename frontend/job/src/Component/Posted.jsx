import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthUserContext'
import Navbar from "../Component/Navbar"
import Card from "../Component/Card"
import { Link, Navigate } from 'react-router-dom'
const Posted = () => {
    const [jobs, setjob] = useState("")
    const auth = useAuth()
    const user = auth?.user
    useEffect(() => {
        const details = async () => {
            const res = await fetch("http://localhost:1042/api/jobdetails", {
                method: "GET",
            })
                .then((res) => res.json())
                .then((res) => {
                    setjob(res)
                })
        }
        details();
        
    }, [])
    const postedjob = [];
    console.log(jobs);
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i]?.authorid === user?.user?._id) {
            postedjob.push(jobs[i]);
        }
    }
    console.log(postedjob);
    const navigat = (e)=>{
         <Navigate to={`check${e}`}></Navigate>
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="goo">
                {postedjob?.length > 0 ? postedjob?.map((job) => (
                    <>
                        <Card data={job}></Card>
                    </>
                    )) : <><h1>No job posted Yet</h1></>}


            </div>
        </div>
    )
}

export default Posted
