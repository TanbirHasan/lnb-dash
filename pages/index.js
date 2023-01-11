import React from "react";
import Login from "./auth/login";

import Home from "./home";

const index = () => {
  return (
    <>
      <Home />
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
  }   else 
  return {
    props: {},
  }
  // else {
  //     return {
  //         props: { auth: true },
  //     }
  // }
}

export default index;


