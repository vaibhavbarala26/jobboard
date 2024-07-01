import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';

const Applicants = ({ data }) => {

    const params = useParams()
    const id = params.id;
    const aid = data?._id;
    console.log(data);
    const [applicants, setApplicants] = useState("")
    const [reject, setReject] = useState(false)
    useEffect(() => {
        const user = async () => {
            const res = await fetch(`http://localhost:1042/api/applicants/${aid}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((res) => { setApplicants(res) 
                    console.log(res);
                })
        }
        user();
    }, [])
    const handlereject = async()=>{
        const r = await fetch(`http://localhost:1042/api/applicantjob/${id}` , {
            method:"PATCH",
            body:JSON.stringify({aid}),
            headers:{"Content-Type" : "application/json"},
            credentials:"include",
        })
        .then((res)=>console.log("success"))
    }
    const handleaccept = async()=>{
        const r = await fetch(`http://localhost:1042/api/applicantjobacc/${id}` , {
            method:"PATCH",
            body:JSON.stringify({aid}),
            headers:{"Content-Type" : "application/json"},
            credentials:"include",
        })
        .then((res)=>console.log("success"))
    }
    if(applicants.length==0){
        return <h1>No Applicants</h1>
    }
    return (
        <div>
            <div className="applicants">
                 <><div className="info">
                    <h2>Name:- {applicants?.name}</h2>
                    <h2>Email:-{applicants?.email}</h2>
                    <div className="tt">
                        <button onClick={handlereject}>Reject</button>
                        <button onClick={handleaccept}>Interview</button>
                    </div>
                </div></>
            </div>

        </div>
    )
}

export default Applicants
