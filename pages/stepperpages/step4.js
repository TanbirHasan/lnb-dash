import React, { useEffect } from "react";

import PaymentOption from "../../components/Search/PaymentOption/PaymentOption";
import Home from "../home";

const Payment = () => {
  useEffect(() => {
    window.scrollTo({ top: 800, behavior: "instant" });
  }, []);
  return (
    <Home>
      <div>
        <PaymentOption />
      </div>
    </Home>
  );
};

export default Payment;
