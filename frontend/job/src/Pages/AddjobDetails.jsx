import React, { useState } from 'react'
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { LiaDollarSignSolid } from "react-icons/lia";
import Navbar from '../Component/Navbar';
import { useAuth } from '../Context/AuthUserContext';
import { Navigate, useParams } from 'react-router';


const AddjobDetails = () => {
    const params = useParams();

   const name = params.id
    const auth = useAuth()
    const user = auth?.user
    const authorid = user?.user?._id;
    console.log(authorid);
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    const [file , setFile] = useState("")
    const handlesubmit = async(e)=>{
        e.preventDefault();
        const data = new FormData();
        const jobtitle = e.target[0].value;
        const workinglocation = e.target[1].value;
        const status = e.target[2].value;
        const country = e.target[4].value;
        const state = e.target[5].value;
        const city = e.target[6].value;
        const salary = e.target[7].value;
        const contact = e.target[8].value;
        const description = e.target[9].value;
        const file = e.target[3].files;
        console.log(e);
        const response = await fetch("http://localhost:1042/api/jobdetails", {
            method:"POST", 
            body:JSON.stringify({name, authorid, jobtitle , workinglocation , status,state , city, country , salary , contact , description }),
            headers:{"Content-Type" : "application/json"},
            credentials:"include",
        })
        .then((res)=>console.log("success"))
    }
    return (
        <>
            <Navbar></Navbar>
            <div className="main">
                <form action="" onSubmit={handlesubmit} encType='multipart/form-data'>
                    <div className="div">
                        <input type="text" placeholder='Job title' />
                        <input type="text" placeholder='remote/hybrid-remote/onsite' />
                        <input type="text" placeholder='full-time/part-time/project' />
                        <label class="custom-file-upload">
                            <input type="file" onChange={(e)=>setFile(e.target.files)} />
                            Custom Upload
                        </label>
                    </div>
                    <div className="sexi">
                        <div className='address'>
                            <div className="span"><h2>Location</h2></div>
                            <div className="fuck">
                                <div className="country">
                                    <CountrySelect
                                        onChange={(e) => {
                                            setCountryid(e.id);
                                        }}
                                        placeHolder="Select Country"
                                    />
                                </div>
                                <div className="country">

                                    <StateSelect
                                        countryid={countryid}
                                        onChange={(e) => {
                                            setstateid(e.id);
                                        }}
                                        placeHolder="Select State"
                                    />
                                </div>
                                <div className="country">

                                    <CitySelect
                                        countryid={countryid}
                                        stateid={stateid}
                                        onChange={(e) => {
                                            const jobtitle = (e);
                                        }}
                                        placeHolder="Select City"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mainslary">
                            <div className="span"><h2>Salary</h2></div>
                            <div className="fucki">
                                <div className="slarycontainer">
                                    <div className="ico"><LiaDollarSignSolid /></div>
                                    <input type="text" />
                                    <span className='k'>k/year</span>
                                </div>
                            </div>
                        </div>
                        <div className="contac">
                            <span><h2>Contact info</h2></span>
                            <div className="fucku">
                                <input type="text" />
                            </div>

                        </div>
                        <div className="descriptions">
                            <textarea name="" id="" placeholder='Job Description' rows={10} cols={90}></textarea>
                        </div>
                        <button>Submit</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default AddjobDetails
