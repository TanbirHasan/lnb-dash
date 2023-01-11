import Link from "next/link";
import React, { useEffect, useState } from "react";
import apiClient from "../../library/apis/api-client";
import LnbDataGrid from "../common/MyProfile/DataGridLnb";
import Dashboard from "../Dashboard/Dashboard";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
const UserList = () => {
  const [rowsData, setRowsData] = useState([]);
  const [paginationData, setPaginationData] = useState();
  const [apiLoading, setApiLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const getUserList = async () => {
    try {
      setApiLoading(true);
      const res = await apiClient.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/?page=${
          page + 1
        }&limit=${pageSize}`
      );

      console.log("userData", res.data);
      if (res.status === 200) {
        const dataRows = res?.data?.data?.map((row) => ({
          id: row?._id,
          name: row?.username,
          firstname: row?.firstname,
          lastname: row?.lastname,
          email: row?.email,
          phonenumber: row?.phoneNumber,
          companywebsite: row?.companyWebsite,
          address: row?.Address,
        }));

        // console.log("resCounts",res?.data.noOfDocuments)
        const paginationData = {
          totalRowCount: res?.data?.noOfDocuments,
          limit: pageSize,
          page: page,
        };
        console.log("from user list", paginationData);

        setRowsData(dataRows);
        setPaginationData(paginationData);
        setApiLoading(false);
      }
    } catch (e) {
      //console.log(e);
      setApiLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, [page, pageSize]);

  // defining columns

  const columns = [
    {
      field: "name",
      headerName: "UserName",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "firstname",
      headerName: "FirstName",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "lastname",
      headerName: "LastName",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 150,
      sortable: false,
      flex: 1,
    },
    {
      field: "companywebsite",
      headerName: "Company Website",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "details",
      headerName: "Payment Details",
      minWidth: 100,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Link href={`paymenthistory/${params.row.id}`}>
          <RemoveRedEyeOutlinedIcon
            fontSize="inherit"
            className="text-[#3294D1] cursor-pointer text-xl mx-auto"
          />
        </Link>
      ),
    },
  ];

  return (
    <Dashboard>
      <div className="pt-5">
        <div className="flex flex-col py-3 px-2 lg:flex-row bg-white my-2 rounded">
          <div className="flex flex-col justify-between w-full lg:w-3/4 lg:flex-row md:flex-row sm:flex-row items-center">
            <div className="w-full flex lg:w-2/4">
              <h6 className="mr-2 text-2xl font-bold">Users List</h6>
            </div>
          </div>
        </div>
        <div></div>
        <div style={{ height: 400, width: "100%" }}>
          {!!rowsData && paginationData && (
            <LnbDataGrid
              apiLoading={apiLoading}
              rowData={rowsData}
              paginationData={paginationData}
              setPage={setPage}
              setPageSize={setPageSize}
              columns={columns}
            />
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default UserList;
