import React, { useEffect } from "react";

import CListSenderTemplate from "../../components/Search/CListSenderTemplate/CListSenderTemplate";
import Home from "../home";

const Previewtemplate = () => {
  useEffect(() => {
    window.scrollTo({ top: 800, behavior: "instant" });
  }, []);
  return (
    <Home>
      <div>
        <CListSenderTemplate />
      </div>
    </Home>
  );
};

export default Previewtemplate;
