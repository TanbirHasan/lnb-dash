import React, { useEffect, useState } from "react";

import AboutUsSecond from "../components/common/AboutUsSecond/AboutUsSecond";
import Conversation from "../components/common/Conversation/Conversation";

import DashboardSlider from "../components/Home/DashboardSlider/DashboardSlider";
import FindCompanies from "../components/Home/FindCompanies/FindCompanies";
import Footer from "../components/Layout/Footer/Footer";
import HomeAboutUs from "../components/Home/HomeAboutUs/HomeAboutUs";
import HowitWorks from "../components/Home/HowitWorks/HowitWorks";

import Banner from "../components/Home/Banner/Banner";

import Navbar from "../components/Layout/Navbar/Navbar";
import StaticPrintPost from "../components/AboutUs/staticPrintPost";
import Stepper from "../components/common/Stepper/Stepper";

import { useRouter } from "next/router";
import Cookies from "js-cookie";


const Home = ({ children }) => {
  const [isShown, setIsShown] = useState(false);
  const [data, setData] = useState();
  const [showNavHidden, setNavVisibility] = useState(true)
  const route = useRouter();

  useEffect(() => {
    const totaldata = JSON.parse(localStorage.getItem("inputdata"));
    setData(totaldata);
  }, []);

  // function for showing result component or home page componenst based on condition

  useEffect(() => {
    console.log("route",route.pathname)
    if (route.pathname === "/" || route.pathname === "/home") {
      setIsShown(true);
      localStorage.removeItem("inputdata");
    } else {
      setIsShown(false);
    }
    if(route.pathname === "/stepperpages/step4" || route.pathname ==="/stepperpages/paymentcomplete"){
      setNavVisibility(false)
    }else{
      setNavVisibility(true)
    }
  }, [route]);

  useEffect(()=>{
    console.log("showNavHidden",showNavHidden)
  },[showNavHidden])

  

  return (
    <>
      <Navbar />

      {showNavHidden && (
        <Banner inputdata={data} /> 
      )}

      {isShown ? (
        <>
          <FindCompanies />
          <StaticPrintPost />
          <DashboardSlider />
          <HowitWorks />
          <HomeAboutUs />
          <AboutUsSecond />
          <Conversation />
        </>
      ) : (
        <>
          <div className="px-3 lg:px-20">
            <Stepper>{children}</Stepper>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  let cookies = context.req.headers.cookie

  if (typeof cookies !== 'string') {
    return {
      redirect: {
      permanent: false,
      destination: "auth/login",
      },
      props:{}, 
    }
  } 
  else 
  return {
    props: {},
  }
  // else {
  //     return {
  //         props: { auth: true },
  //     }
  // }
}


export default Home;
