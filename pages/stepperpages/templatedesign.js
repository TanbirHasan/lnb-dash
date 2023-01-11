import React, { useEffect } from "react";

import Tdesign from "../../components/Search/TemplateDesign/Tdesign";
import Home from "../home";

const Templatedesign = () => {
  useEffect(() => {
    window.scrollTo({ top: 800, behavior: "instant" });
  }, []);
  return (
    <Home>
      <div>
        <Tdesign />
      </div>
    </Home>
  );
};

export default Templatedesign;
