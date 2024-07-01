import { createContext, useContext , useEffect, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const [islogin , setlogin] = useState(false);
    const [user , setuser] = useState("");
    const [redirect , setRedirect] = useState(false);
    const Register = async(name , email , password)=>{
        const  response = await fetch("http://localhost:1042/api/register" , {
            method:"POST", 
            body:JSON.stringify({name , email , password}),
            headers:{"Content-Type" : "application/json"},
            credentials:"include",
        })
        .then((res)=>res.json())
        .then((res)=>{
            setuser(res)
            setlogin(true)
            setRedirect(true)
        })
    }
    const Login = async(email , password)=>{
        const  response = await fetch("http://localhost:1042/api/login" , {
            method:"POST", 
            body:JSON.stringify({ email , password}),
            headers:{"Content-Type" : "application/json"},
            credentials:"include",
        })
        .then((res)=>res.json())
        .then((res)=>{
            setuser(res)
            setlogin(true)
            setRedirect(true)
        })
    }
    useEffect(()=>{
        const userverify = async()=>{
        const response = await fetch("http://localhost:1042/api/user" , {
            method:"GET",
            headers:{"Content-Type" : "application/json"},
            credentials:"include",
        })
        .then((res)=>res.json())
        .then((res)=>{
            setuser(res)
            setlogin(true)
        })
        }
        userverify();
    } , [])
    const Logout = async()=>{
        const response = await fetch("http://localhost:1042/api/logout" , {
            method:"GET",
            headers:{"Content-Type" : "application/json"},
            credentials:"include",
        })
        .then(()=>{
            console.log("loggedout");
            setlogin(false);
            setuser("");
        })
        window.location.reload()
    }
    const value = {Register , islogin , redirect , user , Login , Logout}
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const  useAuth = ()=> useContext(AuthContext)