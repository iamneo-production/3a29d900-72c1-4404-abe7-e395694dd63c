import React from "react"
import { Navigate } from "react-router-dom"

export default function Auth(auth){
  sessionStorage.setItem("isAuth" ,(auth.isAuth));
  sessionStorage.setItem("role" ,(auth.role));
}

 export function Admin({children}){
  const isAuth = sessionStorage.getItem("isAuth");
  const role = sessionStorage.getItem("role");
  console.log(role);
    if(isAuth && role==="Admin")
    return (
      <>{children}</>
    )
    else return  <Navigate to={"/Admin/*"}/>;
  }

 export function User({children}){
  const isAuth = sessionStorage.getItem("isAuth");
  const role = sessionStorage.getItem("role");
  console.log(role);
    if(isAuth && role==="User")
    return (
      <>{children}</>
    )
    else return <Navigate to={"/customer/*"}/>
}

export function Jobseeker({children}){
  const isAuth = sessionStorage.getItem("isAuth");
  const role = sessionStorage.getItem("role");
  console.log(role);
    if(isAuth && role==="Jobseeker")
    return (
      <>{children}</>
    )
    else return <Navigate to={"/jobseeker/*"}/>
}
