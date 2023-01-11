import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { serviceResquestResponseRecoilState } from "../../../store/atoms/serviceRequestResponseRecoil";
import { checkoutRequestClient } from "../../../library/utils/queryClient";
import { useRecoilState } from "recoil";
import { LinearProgress } from "@mui/material";
import { companyListRecoilState } from "../../../store/atoms/companyListRecoil";

const PaymentComplete = () => {
  const route = useRouter();
  const [serviceRequestResponse, setServiceRequestResponse] = useRecoilState(serviceResquestResponseRecoilState)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [isSucessfull, setIsSucessfull] = useState(false)
  const [selectedCompanyData, setSelectedCompanyData] = useRecoilState(companyListRecoilState)

  const onShown = () => {
    setServiceRequestResponse({})
    route.push("/");
  };

  useEffect(()=>{
    console.log("serviceRequestResponse",serviceRequestResponse)
    if(serviceRequestResponse?.requestData?.package_name && serviceRequestResponse?.response?.invoiceId) {
      setPaymentLoading(false)
      setIsSucessfull(true)
    }else{
      setIsSucessfull(false)
    }
  },[])

  useEffect(()=>{
    console.log("isSucessfull",isSucessfull)
  },[isSucessfull])

  // const callCheckoutApi = async() =>{
  //   console.log("callCheckoutApi service running")

  //   try{
  //     setIsSucessfull(false)
  //     setPaymentLoading(true)
  //     const payload = {
  //       "service_request_id" : serviceRequestResponse?.requestData._id,
  //       "paid_amount" : "30",
  //       "token":"754567657"
  //     }
    
  //     const response = await checkoutRequestClient (payload)
  //     console.log("payment",response)

  //     if(response.status === 200){
        
  //         setPaymentLoading(false)
  //         setIsSucessfull(true)
  //         setServiceRequestResponse(prev=>({...prev, response:response.data}))
  //         setSelectedCompanyData([])
          
  //     }
  //   }catch(e){
  //     console.log("error occured",e)
  //     setPaymentLoading(false)
  //   }


  // }

  return (
    <div className="max-w-7xl mx-auto my-3">
      <section className="">
        <div className="shadow-lg py-20 text-center">

          {paymentLoading &&(
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
          
          { (!paymentLoading&&isSucessfull) && (
            <>
              
                <Image
                  src="/assets/PaymentSucces.svg"
                  width="160"
                  height="160"
                  alt="payment completed"
                  className="mx-auto mb-5"
                /> 
              
              
              <h2 className="Tagline lg:text-[40px] md:text-[30px] sm:text-[20px] my-[30px]">
                Payment Successfully Completed
              </h2>
              <p className="headline6 pb-[60px] text-[12px] lg:text-[18px] md:text-[18px] text-[color:var(--Black-three)]">
                You can can view the service detail in your profile section
              </p>


              {serviceRequestResponse?.requestData?.package_name === "DOWNLOAD_SERVICE" &&(
                <Link href={serviceRequestResponse?.response?.excelLink} target="_blank" >
                  <button
                      className="w-[242px] py-4 rounded-lg headline6 my-5 mx-3 text-center bg-[color:var(--primary1-color)] text-white cursor-pointer"
                      // onClick={onShown}
                    >
                      Click to download
                  </button>
                </Link>
                )
              }

              <Link href="">
                <button
                  className="w-[242px] py-4 rounded-lg headline6 my-5 text-center bg-[color:var(--primary1-color)] text-white cursor-pointer"
                  onClick={onShown}>
                  Back Home
                </button>
              </Link>

            </>
          )}

          { (!paymentLoading&&!isSucessfull) && (
            <>
            
              {/* <Image
                src="/assets/PaymentSucces.svg"
                width="160"
                height="160"
                alt="payment completed"
                className="mx-auto mb-5"
              />  */}
             
            
            <h2 className="Tagline lg:text-[40px] md:text-[30px] sm:text-[20px] my-[30px]">
              Payment Failed
            </h2>
            <p className="headline6 pb-[60px] text-[12px] lg:text-[18px] md:text-[18px] text-[color:var(--Black-three)]">
              You can can view the service detail in your profile section
            </p>

            <Link href="">
              <button
                className="w-[242px] py-4 rounded-lg headline6 my-5 text-center bg-[color:var(--primary1-color)] text-white cursor-pointer"
                onClick={onShown}>
                Back Home
              </button>
            </Link>
            </>
          )}

        </div>
      </section>
    </div>
  );
};

export default PaymentComplete;
