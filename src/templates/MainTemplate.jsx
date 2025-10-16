import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainTemplate({children}){
  return (
    <div>
        <Navbar/>
            {children}
        <Footer/>
    </div>
  )
}