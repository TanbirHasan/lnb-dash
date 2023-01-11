import React, { useEffect } from "react";

import Emailsender from "../../components/Search/Emailsender/Email";
import Home from "../home";

const EmailService = () => {
  useEffect(() => {
    window.scrollTo({ top: 800, behavior: "instant" });
  }, []);
  return (
    <Home>
      <div>
        <Emailsender />
      </div>
    </Home>
  );
};

export default EmailService;
