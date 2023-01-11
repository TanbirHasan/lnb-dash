import React, { useEffect } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import Preview from "../Preview/Preview";
import { useRecoilState, useRecoilValue } from "recoil";
import { formStateRecoil } from "../../../store/atoms/formStateRecoil";
import { companyListRecoilState } from "../../../store/atoms/companyListRecoil";
import { serviceRequestClient } from "../../../library/utils/queryClient";
import { useRouter } from "next/router";
import { serviceResquestResponseRecoilState } from "../../../store/atoms/serviceRequestResponseRecoil";

const CListSenderTemplate = ({ ondatasubmit, data }) => {
  const route = useRouter();
  const templateStrings = useRecoilValue(formStateRecoil);
  const companyList = useRecoilValue(companyListRecoilState);
  const [subject, body] = templateStrings.step_three.split(",");
  const [serviceRequestData, setServiceRequestData] = useRecoilState(serviceResquestResponseRecoilState)

  const handleServiceConfirmation = async () => {
    try {
      const emailBody = `<h1>${subject}</h1><p>${body}</p>`;
      const response = await serviceRequestClient({
        companyNumberList: companyList,
        emailBody: emailBody,
        service_type: "MAIL_PRINT_SERVICE",
      });
      console.log("response -> ",response)

      if (response.status === 200) {
        setServiceRequestData(response)

        route.push("/stepperpages/step4");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-5 px-3 shadow-lg lg:py-20 relative">
      <div className="flex justify-center mt-5 items-center">
        <span className="mr-3">
          <PreviewIcon />
        </span>
        <h3>Preview</h3>
      </div>
      <div className="mt-5 flex justify-center">
        {/* <img
          src="/assets/ClistsenderTemplate.png"
          width="350"
          height="600"
          alt=""
          className="shadow-lg"
        /> */}
        <Preview />
      </div>
      <div className="absolute right-0 top-[100%]">
        <button
          className="headline6 bg-[color:var(--form-button-color)] text-white cursor-pointer my-5 border-none py-2 px-5 rounded-lg"
          onClick={handleServiceConfirmation}
        >
          Continue To Next Step
        </button>
      </div>
    </div>
  );
};

export default CListSenderTemplate;
