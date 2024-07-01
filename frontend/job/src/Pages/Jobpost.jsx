import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import { useAuth } from '../Context/AuthUserContext'
import Company from "../Component/Company"
import { Link } from 'react-router-dom'
const Jobpost = () => {
    const auth = useAuth()

    const [display, setDis] = useState(false)
    const [files , setFiles] = useState("")
    const [compani , setCompany] = useState("") 
    const handles = async(e)=>{
        e.preventDefault();
        const name = e.target[0].value;
        const respoi = await fetch("http://localhost:1042/api/postcompany" , {
            method:"POST", 
            body:JSON.stringify({name}),
            headers:{"Content-Type" : "application/json"},
        })
        .then(()=>{
            console.log("like you");
        })
        window.location.reload()
    }
    useEffect(()=>{
        const companies = async() =>{
            const response = await fetch("http://localhost:1042/api/postcompany" , {
                method:"GET",
            })
            .then((res)=>res.json())
            .then((res)=>setCompany(res))
        }
        companies();
    } , [])
    return (
        <div>
            <Navbar></Navbar>
            <div className="jobss">
                {auth?.islogin ? (
                    <>
                        <div className="cards">
                            {compani.length>0 && compani.map((com)=>(
                                <Link to={`/addjob/${com.name}`}>
                                 <Company data={com} key={com._id}></Company>
                                </Link> 
                            ))}
                        </div>
                        <div className={display ? "sexy" : "nothot"}>
                            <form action="" onSubmit={handles}>
                                <input type="text" placeholder='company name' />
                                <button>Add</button>
                            </form>
                        </div>
                        <div className="sexy">
                            <button onClick={(() => { setDis(!display) })}>Add New Company</button></div>
                    </>
                )
                    :
                    (<><h1>You need to Login First</h1></>)}


            </div>
        </div>
    )
}

export default Jobpost
