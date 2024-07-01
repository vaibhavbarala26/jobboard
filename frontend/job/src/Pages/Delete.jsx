import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'

const Delete = () => {
    const para = useParams()
    const [redirect , setRedirect] = useState(false);
    const id = para.id;
    console.log(id);
    useEffect(()=>{
        const deletep = async() =>{
            const response = await fetch(`http://localhost:1042/api/jobdetails/${id}` , {
                method:"DELETE"
            })
            if(response.ok){
                setRedirect(true);
            }
        }
        deletep();
    })
    if(redirect){
        return <Navigate to={"/"}></Navigate>
    }
  return (

    <div>
      <h1>Delete</h1>
    </div>
  )
}

export default Delete
