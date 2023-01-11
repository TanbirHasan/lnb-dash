import React, { useEffect } from "react";

import PrintandPost from "../../components/Search/PrintandPost/PrintandPost";
import Home from "../home";

const Selectoptionpage = () => {
  useEffect(() => {
    window.scrollTo({ top: 800, behavior: "instant" });
  }, []);
  return (
    <Home>
      <div>
        <PrintandPost />
      </div>
    </Home>
  );
};

export default Selectoptionpage;
