/*eslint-disable*/
import React from "react";
import "./loader.scss";
import { Spinner } from "reactstrap";
import styled from "styled-components";
//import LottieComponent from "../../components/LottieComponent";
import GlobeLottie from "../../components/GlobeLottie";

const Loader = () => (
  <div className="loader-overlay">

<div className="fallback-spinner">
    <div className="loading">
      <Spinner color="primary" />
      {/* <GlobeLottie/> */}
      {/* <MainHeader> <Spinner color="primary" /></MainHeader> */}
    </div>
  </div>

  
  </div>
  
);


const MainHeader = styled.header`
display: flex;
justify-content: center;
align-items: center;
padding: 0 4.8rem;
height: 10rem;
background-color: #fff;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
color: #000;
border:1px solid;
border-radius:7px;
`;


export default Loader;