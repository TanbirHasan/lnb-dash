import React, { useEffect, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import SearchModal from "./SearchModal/SearchModal";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { paginationRecoil } from "../../../store/atoms/paginationRecoil";
import { companyListRecoilState } from "../../../store/atoms/companyListRecoil";
import { paginationClient } from "../../../library/utils/queryClient";
import { totalCompanyRecoil } from "../../../store/atoms/totalCompanyRecoil";
import { apiClientRecoil } from "../../../store/atoms/apiClientRecoil";
import { companySearchDataRecoil } from "../../../store/atoms/companySearchDataRecoil";
import { BsChevronDoubleLeft } from "react-icons/bs";

const CompanyList = ({ data, rows }) => {
  const [open, setOpen] = React.useState(false);
  const [paginationState, setPaginationState] =
    useRecoilState(paginationRecoil);
  const [companyData, setCompanyData] = useRecoilState(companyListRecoilState);

  const totalCompany = useRecoilValue(totalCompanyRecoil);
  const [company, setCompany] = useState();

  const resetPaginationRecoil = useResetRecoilState(paginationRecoil);
  const resetApiClientRecoil = useResetRecoilState(apiClientRecoil);
  const [apiClientState, setApiClientState] = useRecoilState(apiClientRecoil);
  const [companySearchDataState, setCompanySearchDataRecoil] = useRecoilState(
    companySearchDataRecoil
  );

  useEffect(() => {
    // const totaldata = JSON.parse(localStorage.getItem("totaldata"));
    setCompany(totalCompany);
  }, [totalCompany]);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = async (e) => {
    try {
      setPaginationState((prev) => ({
        ...prev,
        sort_by: e.target.value,
      }));
      const response = await paginationClient({
        ...paginationState,
        sort_by: e.target.value,
      });
      // console.log("RESPONSE", response)
      rowBuilder(response);
    } catch (error) {
      setPaginationState((prev) => ({
        ...prev,
      }));
      console.log(error);
    }
  };

  const resetRecoilState = () => {
    resetApiClientRecoil();
  };

  const handleLimit = async (p) => {
    // console.log("LIMIT ", p.target.value)
    resetRecoilState();
    try {
      setPaginationState((prev) => ({
        ...prev,
        limit: p.target.value,
        page: 1,
      }));

      const response = await paginationClient({
        ...paginationState,
        limit: p.target.value,
        page: 1,
      });
      // console.log("RESPONSE", response)

      setApiClientState((prev) => ({
        ...prev,
        data: response,
        previousRoute: "/",
      }));

      setPaginationState((prev) => ({
        ...prev,
        limit: p.target.value,
        page: 1,
        total: response.noOfDocuments,
        noTotalPage: response.noOfPages,
      }));
      console.log("paginationState2", paginationState);

      rowBuilder(response);
    } catch (error) {
      setPaginationState((prev) => ({
        ...prev,
      }));
      console.log(error);
    }
  };

  const handleNext = async (e) => {
    try {
      setPaginationState((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
      const response = await paginationClient({
        ...paginationState,
        page: paginationState.page + 1,
      });
      // console.log("RESPONSE", response)

      rowBuilder(response);
    } catch (error) {
      setPaginationState((prev) => ({
        ...prev,
      }));
      console.log(error);
    }
  };
  const handlePrev = async (e) => {
    try {
      setPaginationState((prev) => ({
        ...prev,
        page: prev.page === 1 ? 1 : prev.page - 1,
      }));
      const response = await paginationClient({
        ...paginationState,
        page: paginationState.page === 1 ? 1 : paginationState.page - 1,
      });
      // console.log("RESPONSE", response)
      rowBuilder(response);
    } catch (error) {
      setPaginationState((prev) => ({
        ...prev,
      }));
      console.log(error);
    }
  };

  const columns = [
    // {
    //   field: "checkBox",
    //   headerName: "",
    //   width: 100,
    //   renderCell: params => {
    //     return (
    //       <div className="flex items-center border-2 border-solid px-2 py-1 rounded-2xl">
    //         <FiberManualRecordIcon
    //           className={`${
    //             params?.value === "active" ? "text-green-600 " : "text-gray-600"
    //           } h-4 w-4`}
    //         />
    //         <span className="ml-1">{params?.value}</span>
    //       </div>
    //     );
    //   },
    // }
    { field: "companyname", headerName: "Company name",minWidth: 130,flex:1 },
    { field: "companynumber", headerName: "Company Number", minWidth: 130 ,flex:1 },
    { field: "type", headerName: "Type",  minWidth: 70 ,flex:1 },
    {
      field: "creationdate",
      headerName: "Creation Date",
      type: "date",
      flex:1, 
      minWidth: 130,
    },
    {
      field: "city",
      headerName: "City",
      flex:1, 
      minWidth: 130,
    },
    {
      field: "postcode",
      headerName: "Post Code",
      flex:1, 
      minWidth: 130,
    },
    {
      field: "siccode",
      headerName: "Sic Code",
      flex:1, 
      minWidth: 100,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex:1, 
      renderCell: (params) => {
        return (
          <div className="flex items-center border-2 border-solid px-2 py-1 rounded-2xl">
            <FiberManualRecordIcon
              className={`${
                params?.value === "active" ? "text-green-600 " : "text-gray-600"
              } h-4 w-4`}
            />
            <span className="ml-1">{params?.value}</span>
          </div>
        );
      },
    },
    {
      field: "details",
      headerName: "Details",
      minWidth: 70,
      flex:1, 
      renderCell: (params) => {
        return (
          <Link href={`/companynumber/${params.value}`}>
            <a href={`/companynumber/${params.value}`}>
              <IconButton aria-label="delete" size="small">
                <RemoveRedEyeOutlinedIcon
                  fontSize="inherit"
                  className="text-[#3294D1]"
                />
              </IconButton>
            </a>
          </Link>
        );
      },
    },
  ];

  function CustomFooter() {
    return (
      <GridFooterContainer className="flex justify-end">
        <div className="m-2 flex justify-between">
          <p className="p-3">
            {/* {paginationState.page === 1
              ? 1
              : (paginationState.page - 1) * paginationState.limit + 1}{" "} */}
            {paginationState.page}{" "}
            {/* -{" "}
              {(paginationState.page - 1) * paginationState.limit +
              1 +
              rows.length -
              1}{" "} */}
            of {paginationState.noTotalPage} pages
          </p>
          <div className="p-2">
            <Button
              disabled={paginationState.page === 1}
              variant="outlined"
              onClick={handlePrev}
            >
              <AiOutlineArrowLeft />
            </Button>
            <Button
              disabled={paginationState.page === paginationState.noTotalPage}
              variant="outlined"
              onClick={handleNext}
            >
              <AiOutlineArrowRight />
            </Button>
          </div>
        </div>
      </GridFooterContainer>
    );
  }

  // const [rows, setRows] = useState();
  const [searched, setSearched] = useState("");

  function rowBuilder(data) {
    const dataRows = data?.companyData?.map((row) => ({
      id: row?.company_number,
      companyname: row?.company_name,
      companynumber: row?.company_number,
      type: row?.company_type,
      creationdate: new Date(row?.date_of_creation) ?? "N/A",
      city: row?.registered_office_address.locality,
      postcode: row?.registered_office_address.postal_code,
      siccode: row.sic_codes[0],
      status: row?.company_status,
      details: row?.company_number,
    }));
    setCompanySearchDataRecoil(dataRows);
  }

  function handleRowSelect(p) {
    setCompanyData((prev) => {
      if (prev.length > 0) {
        let i = prev.indexOf(p);
        if (i > -1) {
          return prev.filter((el) => el !== p);
        } else {
          return [...prev, p];
        }
      } else {
        return [...prev, p];
      }
    });
  }

  React.useEffect(() => {
    if (company) {
      rowBuilder(company);
    }
  }, [company]);

  const requestSearch = (e) => {
    setSearched(e.target.value);
    if (searched.length <= 1) {
      rowBuilder(company);
    } else {
      const filteredRows = companySearchDataState.filter((row) => {
        return row.companyname.toLowerCase().includes(searched.toLowerCase());
      });
      // setRows(filteredRows);
      setCompanySearchDataRecoil(filteredRows);
    }
  };

  // console.log(rows);

  return (
    <div>
      <div className="flex flex-col py-3 border-2 px-2  shadow-md lg:flex-row ">
        <div className="flex flex-col justify-between w-full lg:w-3/4 lg:flex-row md:flex-row sm:flex-row items-center">
          <div className="w-full flex lg:w-2/4">
            <h6 className="mr-2 text-[15px] font-bold">Company List</h6>
            <p className="text-[14px]">
              {data?.noOfDocuments} new company found
            </p>
          </div>
          <div className="flex mr-3 items-center mt-2 lg:mt-0 w-full lg:w-2/4 sm:justify-end px-2">
            <p className="mr-2 text-[14px]">Company list per page</p>
            <select
              value={paginationState.limit}
              className="border-2 border-solid rounded h-8"
              onChange={handleLimit}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        <div className="flex lg:justify-between items-center w-full lg:w-auto mt-5 lg:mt-0">
          <div className="w-2/4 ">
            <div className="flex border-2 border-solid rounded px-0 py-1 mr-1 h-8 items-center relative lg:px-2 md:justify-between">
              <input
                value={searched}
                placeholder="Search Here"
                onChange={requestSearch}
                className="Searchbar outline-none"
                sx={{
                  "& .css-i4bv87-MuiSvgIcon-root": {
                    display: "none!important",
                  },
                }}
              />

              <button onClick={handleOpen}>
                {" "}
                <TuneIcon className="cursor-pointer" />
              </button>
              <SearchModal
                open={open}
                setOpen={setOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
                rowBuilder={rowBuilder}
              />
            </div>
          </div>
          <div className="w-2/4 lg:w-auto">
            <div className="flex border-2 border-solid rounded px-0 h-8 lg:px-2 ">
              <select className="w-full outline-none" onChange={handleChange}>
                <option value="">Sort By</option>
                <option value="company">Company Number</option>
                <option value="city">City</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      
      <div>
        {!!companySearchDataState && (
          <div style={{ height: 380, width: "100%" }}>
            <DataGrid
              rows={companySearchDataState}
              columns={columns}
              rowsPerPageOptions={[paginationState.limit]}
              checkboxSelection
              defaultChecked
              // onSelectionModelChange={(newSelectionModel) => (
              //   setCompanyData(prev=> ([...prev, ...newSelectionModel]))

              //   // console.log("newSelectionModel",newSelectionModel)

              // )}
              selectionModel={companyData}
              onCellClick={(p, e) => handleRowSelect(p.row.companynumber)}
              onColumnHeaderClick={(p, e) => {
                console.log("p", p);
              }}
              components={{ Footer: CustomFooter }}
              // components={
              //   NoRowsOverlay: () => (
              //     <Stack
              //       height="100%"
              //       alignItems="center"
              //       justifyContent="center"
              //     >
              //       No data available
              //     </Stack>
              //   ),
              //   NoResultsOverlay: () => (
              //     <Stack
              //       height="100%"
              //       alignItems="center"
              //       justifyContent="center"
              //     >
              //       CustomFooter
              //     </Stack>
              //   ),
              //   Footer: CustomFooter
              // }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
