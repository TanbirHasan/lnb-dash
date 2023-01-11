import { OfflineShareTwoTone } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useResetRecoilState } from "recoil";
import apiClient from "../../../library/apis/api-client";
import { apiClientRecoil } from "../../../store/atoms/apiClientRecoil";
import { paginationRecoil } from "../../../store/atoms/paginationRecoil";
import { totalCompanyRecoil } from "../../../store/atoms/totalCompanyRecoil";
import { useSnackbar } from 'notistack';
import { companyListRecoilState } from "../../../store/atoms/companyListRecoil";

const COMPANY_SEARCH = "company/companySearch";

const Banner = ({ inputdata }) => {
  const router = useRouter();
  const [company, setTotalCompany] = useRecoilState(totalCompanyRecoil);
  const [paginationState, setPaginationState] = useRecoilState(paginationRecoil);
  const [apiClientState, setApiClientState] = useRecoilState(apiClientRecoil);
  const resetPaginationRecoil = useResetRecoilState(paginationRecoil)
  const resetApiClientRecoil = useResetRecoilState(apiClientRecoil)
  const [selectedCompanyData, setSelectedCompanyData] = useRecoilState(companyListRecoilState)


  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    postcode: '',
    sic: '',
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm(
    defaultValues
  );

  // useEffect(() => {
  //   if (inputdata) {
  //     onSubmit(inputdata, "noroute");
  //   }
  // }, [inputdata]);

  const onSubmit = async (data, value) => {
    try {
      resetPaginationRecoil()
      resetApiClientRecoil()

      console.log("data -> ", data)

      const response = await apiClient.get(`/${COMPANY_SEARCH}`, {
        params: { postal_code: data.postcode.toUpperCase(), sic_codes: data.sic, limit:"5" },
      });

      if (response.status === 200) {
        setPaginationState(
          prev => (
            {
          ...prev,
          postal_code: data.postcode.toUpperCase(),
          sic_codes: data.sic,
          limit: 5,
          total: response.data.noOfDocuments,
          noTotalPage: response.data.noOfPages
        })
        );

        setApiClientState(
          prev => (
            {
          ...prev,
          data: response.data,
          previousRoute: "/",
        })
        );
        //  localStorage.setItem("totaldata", JSON.stringify(response.data));
        localStorage.setItem("inputdata", JSON.stringify(data));

        //this data is accesssed in companyLIst component
        setTotalCompany(response.data);

        if (value === "noroute") {
          router.push();
        } else {
          router.push("/stepperpages/step1");
        }
      }else{
        enqueueSnackbar("We couldn't find amy information for your search", { variant: "error" });
      }
    } catch (err) {
      // console.log(err);
      if (err.response) {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      }else{
        // enqueueSnackbar("Could not fetch data", { variant: "error" });
        // console.log("error", err)
      }
    }
    reset();
  };

  // this code will be used if the data is stored in the localstorage
  // useEffect(() => {
  //   setPaginationState(prev => ({
  //     ...prev,
  //     postal_code: data?.postcode,
  //     sic_codes: data?.sic,
  //     limit: 15,
  //     total: data?.noOfDocuments,
  //   }));
  // }, [data, setPaginationState]);

  return (
    <div className="banner px-10 py-10 lg:px-20 lg:py-20 md:py-20 sm:px-10 h-auto">
      <div className="text-center mb-10">
        <h2 className="headline2 headline2Res  text-white mb-10 xl:w-[890px] lg:w-[890px]  mx-auto">
          We help you connect with new local businesses before the competition.
        </h2>
        <p className="headline5 headline5Res text-white lg:w-[712px] md:w-[650px] mx-auto sm:w-[396px] ">
          We help you reach their inboxes, so you can make connections that turn
          into sales. We also offer templates that help you stand out from the
          crowd.
        </p>
      </div>
      <div className="feature flex flex-col justify-center items-center lg:flex-row md:flex-row sm:flex-row text-white mb-10 ">
        <div className="featureclass mb-2">
          <Image src="/assets/Tick.png" width="15" height="15" alt="" />
          <span className="headline7 ml-4 ">Update Every Second</span>
        </div>
        <div className="featureclass mb-2">
          <Image src="/assets/Tick.png" width="15" height="15" alt="" />
          <span className="headline7 ml-4">30 Days Free Trial</span>
        </div>
        <div className="featureclass">
          <Image src="/assets/Tick.png" width="15" height="15" alt="" />
          <span className="headline7 ml-4">Unlimited Data</span>
        </div>
      </div>
      <div>
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="form mb-20 flex justify-evenly lg:flex-row md:flex-row text-center sm:flex flex-col"
        >
          <div className="form-control w-full max-w-xs">
            <label className="headline6 bannerlebleclass">
              Search By Postcode
            </label>
            <input
              type="text"
              placeholder="Postcode"
              className="bannerinputclass"
              {...register("postcode", {
                required: {
                  value: true,
                  message: "Postcode is required",
                },
                pattern: {
                  // value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Provide a valid Postcode", // JS only: <p>error message</p> TS only support string
                },
              })}
            />
            <label className="label">
              {errors.postcode?.type === "required" && (
                <span className="label-text-alt text-white">
                  {" "}
                  {errors?.postcode?.message}
                </span>
              )}
              {errors.postcode?.type === "pattern" && (
                <span className="label-text-alt text-white">
                  {" "}
                  {errors?.postcode?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="headline6 bannerlebleclass">
              Search by SIC Code
            </label>
            <input
              type="text"
              placeholder="SIC Code"
              className="bannerinputclass"
              {...register("sic", {
                required: {
                  value: true,
                  message: "SIC Code is required",
                },
                pattern: {
                  //  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Provide a valid SIC Code", // JS only: <p>error message</p> TS only support string
                },
              })}
            />

            <label className="label">
              {errors.sic?.type === "required" && (
                <span className="label-text-alt text-white">
                  {" "}
                  {errors?.sic?.message}
                </span>
              )}
              {errors.sic?.type === "pattern" && (
                <span className="label-text-alt text-white">
                  {" "}
                  {errors?.sic?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="headline6 text-white text-[14px] lg:text-[16px] md:text-[16px] sm:text-[16px]">
              Click Here to Search Data
            </label>
            <input
              onClick={handleSubmit(onSubmit)}
              className="bannersubmitbutton "
              type="button"
              value="search"
             
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;
