import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { totalCompanyRecoil } from "../../../store/atoms/totalCompanyRecoil";
import { serviceResquestResponseRecoilState } from "../../../store/atoms/serviceRequestResponseRecoil";
import { checkoutRequestClient } from "../../../library/utils/queryClient";
import StripeCheckout from "react-stripe-checkout";
import { useSnackbar } from "notistack";
import { LinearProgress } from "@mui/material";
import { companyListRecoilState } from "../../../store/atoms/companyListRecoil";

const Stepper = ({ children }) => {
  const route = useRouter();

  const [active, setActive] = useState(true);
  const [serviceRequestResponse, setServiceRequestResponse] = useRecoilState(
    serviceResquestResponseRecoilState
  );

  const [stripeToken, setStripeToken] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const onToken = (token) => {
    window.scrollTo({ top: 800, behavior: "instant" });
    setStripeToken(token);
  };
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isSucessfull, setIsSucessfull] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCompanyData, setSelectedCompanyData] = useRecoilState(
    companyListRecoilState
  );

  useEffect(() => {
    if (route.pathname === "/stepperpages/step3") {
      setActive(false);
    } else if (route.pathname === "/stepperpages/emailservice") {
      setActive(false);
    } else if (route.pathname === "/stepperpages/paymentcomplete") {
      setActive(false);
    } else if (
      route.pathname === "/stepperpages/step4" ||
      route.pathname === "/stepperpages/step4"
    ) {
      setActive(false);
      setShowCheckout(true);
    } else {
      setActive(true);
    }
  }, [route]);
  const router = useRouter();

  const handleRoute = () => {
    if (router.pathname == "/stepperpages/step1") {
      router.push("/stepperpages/step2");
    } else if (router.pathname == "/stepperpages/step2") {
      router.push("/stepperpages/step3");
    } else if (router.pathname == "/stepperpages/previewtemplate") {
      router.push("/stepperpages/step4");
    }
    // else if (router.pathname == "/stepperpages/step4") {
    //   router.push("/stepperpages/paymentcomplete");
    // }
    else {
      router.push("/stepperpages/step4");
    }
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const makeRequest = async () => {
      if (!serviceRequestResponse?.requestData?.package_name) {
        enqueueSnackbar("Please choose service before checkout", {
          variant: "error",
        });
        return;
      }

      try {
        console.log("stripeToken.id -> ", stripeToken.id);
        console.log("stripeToken.id -> ", stripeToken);
        setIsSucessfull(false);
        setPaymentLoading(true);

        const payload = {
          service_request_id: serviceRequestResponse?.requestData?._id,
          paid_amount: "5",
          token: stripeToken,
        };
        const response = await checkoutRequestClient(payload);
        console.log("payment", response);

        if (response.status === 200) {
          setPaymentLoading(false);
          setIsSucessfull(true);
          setServiceRequestResponse((prev) => ({
            ...prev,
            response: response.data,
          }));
          setSelectedCompanyData([]);

          router.push("/stepperpages/paymentcomplete");
        }
      } catch (e) {
        console.log("stripe err", e);
        setPaymentLoading(false);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <div className="lg:max-w-7xl mx-auto">
      <ul className="flex justify-evenly mt-10 py-5 border-2 border-solid">
        <div className="flex items-center">
          <span className="hidden xl:block lg:block md:block">1</span>
          {/* <Link href="/stepperpages/totalcompany"> */}
          <Link href="/stepperpages/step1">
            <span
              className={`ml-3 cursor-pointer ${
                route.pathname == "/stepperpages/step1"
                  ? "nav-active px-2 py-2 rounded"
                  : ""
              } `}
            >
              Total Company
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <span className="hidden xl:block lg:block md:block">2</span>
          {/* <Link href="/stepperpages/companylistpage"> */}
          <Link href="/stepperpages/step2">
            <span
              className={`ml-3 cursor-pointer ${
                route.pathname == "/stepperpages/step2"
                  ? "nav-active px-2 py-2 rounded"
                  : ""
              } `}
            >
              Company List
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <span className="hidden xl:block lg:block md:block">3</span>
          {/* <Link href="/stepperpages/selectoptionpage"> */}
          <Link href="/stepperpages/step3">
            <span
              className={`ml-3 cursor-pointer ${
                route.pathname == "/stepperpages/step3" ||
                route.pathname == "/stepperpages/emailservice" ||
                route.pathname == "/stepperpages/templatedesign" ||
                route.pathname == "/stepperpages/companylistsender" ||
                route.pathname == "/stepperpages/previewtemplate"
                  ? "nav-active px-2 py-2 rounded"
                  : ""
              } `}
            >
              Select Option
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <span className="hidden xl:block lg:block md:block">4</span>
          {/* <Link href="/stepperpages/payment"> */}
          <Link href="/stepperpages/step4">
            <span
              className={`ml-3 cursor-pointer ${
                route.pathname == "/stepperpages/step4"
                  ? "nav-active px-2 py-2 rounded"
                  : ""
              } `}
            >
              Payment
            </span>
          </Link>
        </div>
      </ul>
      {!paymentLoading && children}

      {paymentLoading && (
        <>
          <LinearProgress />
          <h2 className="Tagline lg:text-[40px] md:text-[30px] sm:text-[20px] my-[30px]">
            Your payment is being processed
          </h2>
          <p className="headline6 pb-[60px] text-[12px] lg:text-[18px] md:text-[18px] text-[color:var(--Black-three)]">
            Download link will be available shortly....
          </p>
        </>
      )}
      <div className="flex justify-between items-center">
        <div></div>
        {/* <button
          className="rounded px-3 py-2 border-2 border-[#D16F32] text-[#D16F32] cursor-pointer"
          onClick={handleBack}
        >
          Back
        </button> */}
        {active && (
          <button
            className="headline6 bg-[color:var(--form-button-color)] text-white cursor-pointer my-5 border-none py-2 px-5 rounded-lg"
            onClick={handleRoute}
          >
            Continue To Next Step
          </button>
        )}

        {showCheckout && (
          <StripeCheckout
            name="Local New Business"
            image="https://avatars.githubusercontent.com/u/1486366?v=4"
            billingAddress
            shippingAddress
            description={`Your total is £5`}
            amount={5 * 100}
            token={onToken}
            // stripeKey={`${process.env.STRIPE_PUBLIC_KEY}`}
            stripeKey={
              "pk_test_51LzjiLKxA1nMm4Zk1XBA05wuv8Ugj5CNIvFET7shLNeGO3FPLl7m4Xplt8MOk0rr2qrV7HU2pjhU4ob4lzs7C23R00NxQjLJuq"
            }
          >
            <button
              className="headline6 bg-[color:var(--form-button-color)] text-white cursor-pointer my-5 border-none py-2 px-5 rounded-lg"
              onClick={handleRoute}
            >
              Checkout
            </button>
          </StripeCheckout>
        )}
      </div>
    </div>
  );
};

export default Stepper;
