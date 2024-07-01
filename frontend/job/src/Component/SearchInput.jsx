import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const SearchInput = () => {
  const [val , setVla] = useState("")
  const [job , setjob] = useState("")
  const [search , setSearch] = useState("")
  useEffect(()=>{
    const details = async() =>{
      const res = await fetch("http://localhost:1042/api/jobdetails" , {
        method:"GET",
      })
      .then((res)=>res.json())
      .then((res)=>{console.log(res)
        setjob(res)
      })
    }
    details();
  } , [])
  return (
    <div className='search'>
        <div className="searchbox">
            <form action="">
                <input type="text" value= {val} 
                onChange={((e)=>{setVla(e.target.value) , setSearch(e.target.value)})}/>
                <button>Search</button>
                <div className={val.length> 0 ? "sexiest" : "notsexiest"}>
                  { job.length> 0 && job.filter((item)=>{
                    return search.toLowerCase() === ""  ? item : item.name.toLowerCase().includes(search) || item.jobtitle.toLowerCase().includes(search);
                  }).map((jo)=>(
                <Link to={`/apply/${jo?._id}`}>
                   <div className="jo">
                    <h2>{jo.name}</h2>
                    <h6>{jo.jobtitle}</h6>
                   </div> 
                   </Link>
                    ))}
                </div>
            </form>
        </div>
    </div>
  )
}

export default SearchInput
