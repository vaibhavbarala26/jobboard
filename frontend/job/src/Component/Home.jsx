import React from 'react'
import Navbar from "./Navbar"
import Hero from "./Hero"
import SearchInput from "./SearchInput"
import Jobdescription from "./Jobdescription"
import { Link } from 'react-router-dom'
import Footer from './Footer'
const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="applied">
        <Link to={"/applied"}><button>Applied Jobs</button></Link>
      </div>
      <p></p>
      <div className="applied">
        <Link to={"/posted"}><button>Posted Jobs</button></Link>
      </div>
    <Hero></Hero>
    <SearchInput></SearchInput>
    <Jobdescription></Jobdescription>
    <Footer></Footer>
    </div>
  )
}

export default Home
