import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const card = ({ data }) => {
    console.log(data);
    const [redirect , setRedirect] = useState(false)
    if(redirect){
        return <Navigate to={`check/${data?._id}`}></Navigate>
    }
    return (
        <div>
            
            <div className="namie" style={{borderRadius:"10px"}}>
                <span>Comapnyname :-{data?.name}</span>
                <span>Title:-{data?.jobtitle}</span>
                <span>Number of applicants:-{data?.applicants?.length}</span>
                <button onClick={(()=>setRedirect(true))}>Check</button>
            </div>
           

        </div>
    )
}

export default card
