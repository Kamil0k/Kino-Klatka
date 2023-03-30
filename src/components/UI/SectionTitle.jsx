import React from "react";

import './SectionTitle.css'

const SectionTitle = (props) =>{
    return(
        <>
        <h2 className="title" id="aboutus">{props.title}</h2>
        </>
    )
}

export default SectionTitle;