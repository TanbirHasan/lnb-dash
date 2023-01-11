import React, { useEffect } from "react";

import CompnayListSender from "../../components/Search/CompanyListSender/CompnayListSender";
import Home from "../home";

const Companylistsender = () => {
  useEffect(() => {
    window.scrollTo({ top: 800, behavior: "instant" });
  }, []);
  return (
    <Home>
      <div>
        <CompnayListSender />
      </div>
    </Home>
  );
};

export default Companylistsender;
