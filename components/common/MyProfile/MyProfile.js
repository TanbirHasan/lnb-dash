import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import Image from "next/future/image";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useState } from "react";
import apiClient from "../../../library/apis/api-client";
import EditProfileModal from "./editProfileModal";
import moment from "moment/moment";
import LnbDataGrid from "./DataGridLnb";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Link from "next/link";
import SubdirectoryArrowRightSharpIcon from "@mui/icons-material/SubdirectoryArrowRightSharp";
import Tooltip from "@mui/material/Tooltip";

const MyProfile = () => {
  const [value, setValue] = useState(0);
  const [showChild, setShowChild] = useState(false);
  const [userData, setData] = useState();
  const [open, setOpen] = React.useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [pageDetails, setPageDetails] = useState(0);
  const [pageSizeDetails, setPageSizeDetails] = useState(5);
  const [checkoutId, setCheckoutId] = useState(null);
  const [paginationDataDetails, setPaginationDataDetails] = useState();
  const [detailsData, setDetailsData] = useState();

  const [paginationData, setPaginationData] = useState();
  const [apiLoading, setApiLoading] = useState(false);
  const [serviceData, setServiceData] = useState();
  const [isDetails, setIsDetails] = useState(false);

  const columns = [
    { field: "companyName", headerName: "Company name", flex: 1, minWidth: 200, },
    { field: "companyNumber", headerName: "Company Number", flex: 1, minWidth: 130, },
    { field: "type", headerName: "Type", flex: 1 , minWidth: 100},
    {
      field: "creationDate",
      headerName: "Creation Date",
      type: "date",
      flex: 1,
      minWidth: 130
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      minWidth: 130
    },
    {
      field: "postcode",
      headerName: "Post Code",
      flex: 1,
      minWidth: 100
    },
    {
      field: "sicCode",
      headerName: "Sic Code",
      flex: 1,
      minWidth: 100
    },
    {
      field: "status",
      flex: 1,
      minWidth: 100,
      headerName: "Status",
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
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <Link href={`/companynumber/${params.value}`}>
            <IconButton aria-label="delete" size="small">
              <RemoveRedEyeOutlinedIcon
                fontSize="inherit"
                className="text-[#3294D1]"
              />
            </IconButton>
          </Link>
        );
      },
    },
  ];
  const paymentColumns = [
    {
      field: "companyTotal",
      headerName: "Number of Company",
      flex: 1,
      minWidth: 150,
    },
    { field: "date", headerName: "Date", flex: 1, minWidth: 150 },
    { field: "time", headerName: "Time", type: "date", flex: 1, minWidth: 130 },
    {
      field: "receiveCurrency",
      headerName: "Receive currency",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "sentCurrency",
      headerName: "Sent currency",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "paymentStatus",
      flex: 1,
      minWidth: 130,
      headerName: "Payment status",
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
      width: 100,
      renderCell: (params) => {
        return (
          <div onClick={()=>{
            if (params.row.paymentStatus === 'PAID') {
              if (params.row.packageName === 'Print and Post'){
                setIsDetails(true);
                setCheckoutId(params.row.id)
              }
              else {
                console.log(params.row)
              }
            }
            else {
              console.log('Please add stripe here')
            }
          }
          }>
            <Tooltip
              placement="right"
              title={
                params?.row?.paymentStatus === "UNPAID" ? "Pay Now" : "Details"
              }
            >
              <IconButton aria-label="delete" size="small">
                {params?.row?.paymentStatus === "UNPAID" && (
                  <SubdirectoryArrowRightSharpIcon
                    fontSize="inherit"
                    className="text-[#3294D1]"
                  />
                )}
                {params?.row?.paymentStatus !== "UNPAID" && (
                  <RemoveRedEyeOutlinedIcon
                    fontSize="inherit"
                    className="text-[#3294D1]"
                  />
                )}
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const paymentHistoryColumns = [
    {
      field: "packageName",
      headerName: "Package Name",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "companyTotal",
      headerName: "Number of Company",
      flex: 1,
      minWidth: 130,
    },
    { field: "date", headerName: "Date", flex: 1, minWidth: 130 },
    { field: "time", headerName: "Time", type: "date", flex: 1, minWidth: 130 },
    {
      field: "receiveCurrency",
      headerName: "Receive currency",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "sentCurrency",
      headerName: "Sent currency",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "paymentStatus",
      flex: 1,
      minWidth: 130,
      headerName: "Payment status",
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
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
            <div onClick={()=>{
              if (params.row.paymentStatus === 'PAID') {
                if (params.row.packageName === 'Print and Post'){
                  setIsDetails(true);
                  setCheckoutId(params.row.id)
                }
                else {
                  console.log(params.row)
                }
              }
              else {
                console.log('Please add stripe here')
              }
            }
            }>
              <Tooltip
                  placement="right"
                  title={
                    params?.row?.paymentStatus === "UNPAID" ? "Pay Now" : "Details"
                  }
              >
                <IconButton aria-label="delete" size="small">
                  {params?.row?.paymentStatus === "UNPAID" && (
                      <SubdirectoryArrowRightSharpIcon
                          fontSize="inherit"
                          className="text-[#3294D1]"
                      />
                  )}
                  {params?.row?.paymentStatus !== "UNPAID" && (
                      <RemoveRedEyeOutlinedIcon
                          fontSize="inherit"
                          className="text-[#3294D1]"
                      />
                  )}
                </IconButton>
              </Tooltip>
            </div>
        );
      },
    },
  ];

  const getHistoryDetailsByToken = async () => {
    if (!! checkoutId) {
      try {
        setApiLoading(true);
        const res = await apiClient.get(
            `${
                process.env.NEXT_PUBLIC_API_BASE_URL
            }/history/HistoryDetailbyToken/?page=${pageDetails + 1}&limit=${pageSizeDetails}&request_id=${checkoutId}`
        );
        if (res.status === 200) {
          const dataRows = res?.data?.historyDetail.map((row) => (
                  {
                    id: row?.company_data?._id,
                    companyName: row?.company_data?.company_name,
                    companyNumber: row?.company_data?.company_number,
                    type: row?.company_data?.company_type,
                    creationDate: moment(row?.company_data?.date_of_creation).format(
                        "D MMM YYYY"
                    ),
                    city: row?.company_data?.registered_office_address?.locality,
                    postcode: row?.company_data?.registered_office_address?.postal_code,
                    sicCode: [row?.company_data?.sic_codes],
                    status: row?.req_status,
                    details: row?.company_data?.company_number,
                  }));
          const paginationData = {
            totalRowCount: res?.data?.noOfDocuments,
            limit: pageSizeDetails,
            page: pageDetails,
          };

          setDetailsData(dataRows);
          setPaginationDataDetails(paginationData);
          setApiLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    }


  };
  useEffect(() => {
    if (!! isDetails) {
      getHistoryDetailsByToken().then((r) => r);
    }
  }, [isDetails, page, pageSize, checkoutId]);

  const getProfileData = async () => {
    const res = await apiClient.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/self/profile`
    );
    if (res.status === 200) {
      setData(res?.data?.data);
    }
  };
  useEffect(() => {
    getProfileData().then((r) => r);
  }, []);

  const getServicePaymentHistory = async (serviceName) => {
    const url =
      !!serviceName === true
        ? `${
            process.env.NEXT_PUBLIC_API_BASE_URL
          }/history/paymentHistorybyToken/?page=${
            page + 1
          }&limit=${pageSize}&package_name=${serviceName}`
        : `${
            process.env.NEXT_PUBLIC_API_BASE_URL
          }/history/paymentHistorybyToken/?page=${page + 1}&limit=${pageSize}`;

    try {
      const response = await apiClient.get(url);
      if (response.status === 200) {
        const serviceRows = response?.data?.paymentHistory.map((row) => ({
          id: row?._id,
          companyList:row?.companyList,
          packageName:
            row?.package_name === "MAIL_PRINT_SERVICE"
              ? "Print and Post"
              : row?.package_name === "EMAIL_SERVICE"
              ? "Email"
              : "Download",
          companyTotal: row?.companyList.length,
          time: moment(row?.createdAt).format("HH:mm"),
          date: moment(row?.createdAt).format("D MMM YYYY"),
          sentCurrency: "GBP",
          receiveCurrency: "GBP",
          paymentStatus: row?.payment_status,
          details: row?._id,
        }));
        const paginationData = {
          totalRowCount: response?.data?.noOfDocuments,
          limit: pageSize,
          page: page,
        };

        setServiceData(serviceRows);
        setPaginationData(paginationData);
        setApiLoading(false);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
      }
    }
  };
  useEffect(() => {
    if (value === 1) {
      getServicePaymentHistory().then((r) => r);
    }
    if (value === 2) {
      getServicePaymentHistory("MAIL_PRINT_SERVICE").then((r) => r);
    }
    if (value === 3) {
      getServicePaymentHistory("DOWNLOAD_SERVICE").then((r) => r);
    }
    if (value === 4) {
      getServicePaymentHistory("EMAIL_SERVICE").then((r) => r);
    }
    setShowChild(true);
  }, [page, value, pageSize]);

  if (!showChild) {
    return null;
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <section className="section-style">
        <div className="bg-[#3294D1] md:min-h-[285px] sm:min-h-[285px] min-h-[200px] sm:p-12 p-5 rounded-xl">
          <div className=" flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-white">
                {" "}
                <PersonIcon />
              </span>

              <h2 className="text-white sm:ml-4 ml-2 text-[16px] sm:text-[20px] lg:text-[20px] md:text-[20px] text-left mt-0 sm:mt-1 uppercase">
                My Profile
              </h2>
            </div>

            <div className="">
              <button
                onClick={() => setOpen(true)}
                className="flex bg-[#D16F32] text-white sm:text-[14px] text-[12px] cursor-pointer px-4 md:py-3 py-2 rounded-md items-center"
                href=""
              >
                <span className="mr-2">
                  {" "}
                  <EditIcon />
                </span>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="flex bg-white rounded-xl mt-[-90px] mx-5 sm:mx-12 pb-8  shadow-xl">
          {!!userData && (
            <Image
              loader={() =>
                `${process.env.NEXT_PUBLIC_BASE_URL}/logos/${userData?.logoUrl}`
              }
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/logos/${userData?.logoUrl}`}
              width={500}
              height={500}
              alt="logo text"
              className="mt-[-30px] md:mx-6 mx-3  border rounded-full bg-white md:w-[176px] md:h-[176px] w-[120px] h-[120px] object-cover"
            />
          )}

          <div className="flex flex-col justify-center items-start">
            <h1 className="headline1 uppercase font-bold lg:text-[26px] md:text-[26px] sm:text-[20px] text-sm my-2">
              {`${userData?.firstname} ${userData?.lastname}`}
            </h1>
            <h4 className="text-[12px] md:text-sm font-medium">Director</h4>
          </div>
        </div>
      </section>
      <div className="section-style">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              height: "55px",
              background: "#FFFFF",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
              borderRadius: "10px",
              padding: "7px 0px",
            }}
          >
            <Tabs
              TabIndicatorProps={{
                style: { background: "#D16F32" },
              }}
              value={value}
              variant="scrollable"
              onChange={handleChange}
              scrollButtons="auto"
              allowScrollButtonsMobile
              aria-label="scrollable auto tabs example"
            >
              <Tab
                style={{
                  textTransform: "none",
                  color: value === 0 ? "#D16F32" : "#909090",
                  fontSize: 17,
                  fontWeight: value === 0 ? "bold" : "",
                }}
                label="Basic"
                {...a11yProps(0)}
              />
              <Tab
                style={{
                  textTransform: "none",
                  color: value === 1 ? "#D16F32" : "#909090",
                  fontSize: 17,
                  fontWeight: value === 1 ? "bold" : "",
                }}
                label="Payment"
                {...a11yProps(1)}
              />
              <Tab
                style={{
                  textTransform: "none",
                  color: value === 2 ? "#D16F32" : "#909090",
                  fontSize: 17,
                  fontWeight: value === 2 ? "bold" : "",
                }}
                label="Print and post"
                {...a11yProps(1)}
              />
              <Tab
                style={{
                  textTransform: "none",
                  color: value === 3 ? "#D16F32" : "#909090",
                  fontSize: 17,
                  fontWeight: value === 3 ? "bold" : "",
                }}
                label="Download"
                {...a11yProps(1)}
              />
              <Tab
                style={{
                  textTransform: "none",
                  color: value === 4 ? "#D16F32" : "#909090",
                  fontSize: 17,
                  fontWeight: value === 4 ? "bold" : "",
                }}
                label="Email"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="text-xl py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl font-bold text-[#797979]">
              Basic
            </div>
            <div className="companyprofile-table">
              <table className="w-full shadow-lg rounded-2xl">
                <tbody>
                  <tr>
                    <td>Phone Number: </td>
                    <td>{userData?.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Email: </td>
                    <td>{userData?.email}</td>
                  </tr>
                  <tr>
                    <td>Company Name</td>
                    <td>{userData?.company_name}</td>
                  </tr>
                  <tr>
                    <td>Services we Provide: </td>
                    <td>{userData?.companyType}</td>
                  </tr>
                  <tr>
                    <td>Website: </td>
                    <td>{userData?.companyWebsite}</td>
                  </tr>
                  <tr>
                    <td>Joining Date:</td>
                    <td>{moment(userData?.createdAt).format("D MMM YYYY")}</td>
                  </tr>
                  <tr>
                    <td>Address: </td>
                    <td>{`${userData?.country} ${userData?.city} `}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {
                !!isDetails &&(
                    <div className='uppercase'>
                      <div>
                        <div className="py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow text-[#797979] flex gap-5">
                          <span className='rounded-t-2xl font-bold text-xl'>Details history</span>
                          <div className='capitalize bg-white cursor-pointer' onClick={()=>setIsDetails(false)}>Back</div>
                        </div>
                        <div className="w-full shadow-lg rounded-2xl">
                          {!!paginationDataDetails && serviceData && (
                              <LnbDataGrid
                                  apiLoading={apiLoading}
                                  rowData={detailsData}
                                  paginationData={paginationDataDetails}
                                  setPage={setPageDetails}
                                  setPageSize={setPageSizeDetails}
                                  columns={columns}
                              />
                          )}
                          {!paginationData && serviceData && <div>Loading ...</div>}
                        </div>
                      </div>
                    </div>
                )
            }
            {
                !isDetails &&(
                    <div>
                      <div className="text-xl py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl font-bold text-[#797979]">
                        PAYMENT HISTORY
                      </div>
                      <div className="w-full shadow-lg rounded-2xl">
                        {!!paginationData && serviceData && (
                            <LnbDataGrid
                                apiLoading={apiLoading}
                                rowData={serviceData}
                                paginationData={paginationData}
                                setPage={setPage}
                                setPageSize={setPageSize}
                                columns={paymentHistoryColumns}
                            />
                        )}
                        {!paginationData && serviceData && <div>Loading ...</div>}
                      </div>
                    </div>
                )}



          </TabPanel>

          <TabPanel value={value} index={2}>
            {
              !!isDetails &&(
                  <div className='uppercase'>
                    <div>
                      <div className="py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow text-[#797979] flex gap-5">
                        <span className='rounded-t-2xl font-bold text-xl'>Details history</span>
                        <div className='capitalize bg-white cursor-pointer' onClick={()=>setIsDetails(false)}>Back</div>
                      </div>
                      <div className="w-full shadow-lg rounded-2xl">
                        {!!paginationDataDetails && serviceData && (
                            <LnbDataGrid
                                apiLoading={apiLoading}
                                rowData={detailsData}
                                paginationData={paginationDataDetails}
                                setPage={setPageDetails}
                                setPageSize={setPageSizeDetails}
                                columns={columns}
                            />
                        )}
                        {!paginationData && serviceData && <div>Loading ...</div>}
                      </div>
                    </div>
                  </div>
                )
            }
            {
                !isDetails &&(
                    <div>
                      <div className="text-xl py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl font-bold text-[#797979]">
                        PRINT AND POST
                      </div>
                      <div className="w-full shadow-lg rounded-2xl">
                        {!!paginationData && serviceData && (
                            <LnbDataGrid
                                apiLoading={apiLoading}
                                rowData={serviceData}
                                paginationData={paginationData}
                                setPage={setPage}
                                setPageSize={setPageSize}
                                columns={paymentColumns}
                            />
                        )}
                        {!paginationData && serviceData && <div>Loading ...</div>}
                      </div>
                    </div>
                )
            }


          </TabPanel>

          <TabPanel value={value} index={3}>
            <div className="text-xl py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl font-bold text-[#797979]">
              DOWNLOAD
            </div>
            <div className="w-full shadow-lg rounded-2xl">
              {!!paginationData && serviceData && (
                <LnbDataGrid
                  apiLoading={apiLoading}
                  rowData={serviceData}
                  paginationData={paginationData}
                  setPage={setPage}
                  setPageSize={setPageSize}
                  columns={paymentColumns}
                />
              )}
              {!paginationData && serviceData && <div>Loading ...</div>}
            </div>
          </TabPanel>

          <TabPanel value={value} index={4}>
            <div className="text-xl py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl font-bold text-[#797979]">
              EMAIL
            </div>
            <div className="w-full shadow-lg rounded-2xl">
              {!!paginationData && serviceData && (
                <LnbDataGrid
                  apiLoading={apiLoading}
                  rowData={serviceData}
                  paginationData={paginationData}
                  setPage={setPage}
                  setPageSize={setPageSize}
                  columns={paymentColumns}
                />
              )}
              {!paginationData && serviceData && <div>Loading ...</div>}
            </div>
          </TabPanel>
        </Box>
      </div>
      {!!userData ? (
        <EditProfileModal
          open={open}
          data={userData}
          setOpen={setOpen}
          getProfileData={getProfileData}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default MyProfile;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{}}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    index: index,
  };
}
