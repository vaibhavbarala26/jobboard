import React from 'react'
import { FaArrowRight } from "react-icons/fa";
const Company = ({data}) => {
 
  return (
    <div >
      <div className="iyk">
        <span> {data.name} </span>
        <span><FaArrowRight /></span>
      </div>
    </div>
  )
}

export default Company
