import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer style={{color:"gray" , display:"flex" , justifyContent:"center" , height:"5vh" , margin:"2vh"} }>
            <div>
                © 2020 Copyright:
                <Link to={"/"} style={{color:"gray"}} >Job board</Link>
            </div>

        </footer>
    )
}

export default Footer
