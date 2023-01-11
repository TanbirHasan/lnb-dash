import React, { useEffect } from "react";

import CompanyList from "../../components/Search/CompanyList/CompanyList";
import Home from "../home";

const CompanylistPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 800, behavior: "instant" });
  }, []);

  return (
    <Home>
      <div>
        <CompanyList />
      </div>
    </Home>
  );
};

export default CompanylistPage;
