import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthLayout from "./layout";
import { regiSchema } from "./utils/helper";
import apiClient from "../../library/apis/api-client";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const RES_URL = "register";

const Registration = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    country: "",
    countryCode: "",
    state: "",
    zip: "",
    address: "",
    userName: "",
    companyWebsite: "",
    companyName: "",
    companyType: "",
    password: "",
  };

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(regiSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const disableHandler = () => {
    return !(
      dirtyFields.address &&
      dirtyFields.country &&
      dirtyFields.countryCode &&
      dirtyFields.email &&
      dirtyFields.firstname &&
      dirtyFields.lastname &&
      dirtyFields.phoneNumber &&
      dirtyFields.state &&
      dirtyFields.zip
    );
  };

  const onSubmit = async (values) => {
    const data = {
      username: values.userName,
      firstname: values.firstname,
      lastname: values.lastname,
      password: values.password,
      email: values.email,
      company_name: values.companyName,
      companyWebsite: values.companyWebsite,
      Address: values.address,
      city: values.state,
      post_code: values.zip,
      companyType: values.companyType,
      country: values.country,
      phoneNumber: values.phoneNumber,
      countryCode: values.countryCode,
      provinceOrState: values.state, //Need Api modification to remove this.
    };
    try {
      const response = await apiClient.post(`/auth/register`, data);
      if (response.status === 200) {
        enqueueSnackbar(response.data.message, { variant: "success" });
        reset();
        await router.push("/auth/login");
      }
    } catch (err) {
      if (err.response) {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      }
      console.log(err);
    }
  };

  return (
    <AuthLayout>
      <form
        name="registrationForm"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-5 py-10 justify-center items-center"
      >
        <h3 className="headline4 text-[18px] lg:text-[24px] md:text-[24px] items-start my-7">
          Register in to Local New Business
        </h3>
        <div className="w-full md:w-4/6 lg:w-3/6">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="justify-between"
                textColor="inherit"
                TabIndicatorProps={{ style: { background: "#D16F32" } }}
              >
                <Tab
                  label="Step 1"
                  {...a11yProps(0)}
                  style={{ minWidth: "50%" }}
                />
                <Tab
                  label="Step 2"
                  {...a11yProps(1)}
                  style={{ minWidth: "50%" }}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className=" flex flex-col gap-4 items-center justify-between w-full mt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  <Controller
                    name="firstname"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        type="text"
                        className="bg-white rounded"
                        autoFocus={true}
                        placeholder="First Name"
                        error={!!errors.firstname}
                        helpertext={errors?.firstname?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="lastname"
                    control={control}
                    rules={{
                      required: true,
                      validate: (value) => {
                        if (value === "") {
                          return "Please provide input name";
                        }
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Last Name"
                        type="text"
                        className="bg-white rounded"
                        autoFocus={true}
                        placeholder="Last Name"
                        error={!!errors.lastname}
                        helpertext={errors?.lastname?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      className="bg-white rounded"
                      autoFocus={true}
                      placeholder="Email"
                      error={!!errors.email}
                      helpertext={errors?.email?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
                {/* phone number */}
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) => {
                      if (value === "") {
                        return "Please provide input name";
                      }
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      type="tel"
                      className="bg-white rounded"
                      autoFocus={true}
                      placeholder="Phone Number"
                      error={!!errors.phoneNumber}
                      helpertext={errors?.phoneNumber?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Country"
                        type="text"
                        className="bg-white rounded col-span-2"
                        autoFocus={true}
                        placeholder="Country"
                        error={!!errors.country}
                        helpertext={errors?.country?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="countryCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Country Code"
                        type="number"
                        className="bg-white rounded col-span-1"
                        autoFocus={true}
                        placeholder="Country Code"
                        error={!!errors.countryCode}
                        helpertext={errors?.countryCode?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="State/City"
                        type="text"
                        className="bg-white rounded col-span-2"
                        autoFocus={true}
                        placeholder="State/City"
                        error={!!errors.state}
                        helpertext={errors?.state?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="zip"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Post Code"
                        type="number"
                        className="bg-white rounded col-span-1"
                        autoFocus={true}
                        placeholder="Post Code"
                        error={!!errors.zip}
                        helpertext={errors?.zip?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Address"
                      type="text"
                      className="bg-white rounded col-span-2"
                      autoFocus={true}
                      placeholder="Address"
                      error={!!errors.address}
                      helpertext={errors?.address?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
                <button
                  type="button"
                  disabled={disableHandler()}
                  onClick={() => setValue(1)}
                  className="text-white hover:bg-primaryHover bg-primary cursor-pointer mt-5 capitalize p-4 rounded-md font-bold shadow-none hover:shadow-none w-full"
                >
                  Next
                </button>

                <p className="mx-auto headline8 flex gap-2 items-center">
                  Already have an account?
                  <Link href="/auth/login">
                    <span className="formbottomlink">Sign in</span>
                  </Link>
                </p>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className=" flex flex-col gap-4 items-center justify-between w-full mt-5">
                <Controller
                  name="userName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Username"
                      type="email"
                      className="bg-white rounded"
                      autoFocus={true}
                      placeholder="Username"
                      error={!!errors.userName}
                      helpertext={errors?.userName?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="companyWebsite"
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) => {
                      if (value === "") {
                        return "Please provide input name";
                      }
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Company Website"
                      type="text"
                      className="bg-white rounded"
                      autoFocus={true}
                      placeholder="Company Website"
                      error={!!errors.companyWebsite}
                      helpertext={errors?.companyWebsite?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="companyName"
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) => {
                      if (value === "") {
                        return "Please provide company name";
                      }
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Company Name"
                      type="text"
                      className="bg-white rounded"
                      autoFocus={true}
                      placeholder="Company Name"
                      error={!!errors.companyName}
                      helpertext={errors?.companyName?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                {/* company type */}

                <Controller
                  name="companyType"
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) => {
                      if (value === "") {
                        return "Please provide input name";
                      }
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Company Type"
                      type="text"
                      className="bg-white rounded"
                      autoFocus={true}
                      placeholder="Company Type"
                      error={!!errors.companyType}
                      helpertext={errors?.companyType?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) => {
                      if (value === "") {
                        return "Please provide input name";
                      }
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      placeholder="Password"
                      className="bg-white rounded"
                      autoFocus={true}
                      autoComplete="new-password"
                      type={showPassword ? "text" : "password"}
                      error={!!errors.password}
                      helpertext={errors?.password?.message}
                      variant="outlined"
                      required
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {!showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <button
                  type="submit"
                  className="text-white hover:bg-primaryHover bg-primary cursor-pointer my-5 capitalize p-4 rounded-md font-bold shadow-none hover:shadow-none w-full"
                >
                  Create Account
                </button>

                <div className="form-control w-full relative mb-2 self-baseline -mt-4 ">
                  <input
                    type="checkbox"
                    className="appearance h-5 w-5  accent-primary mr-3"
                  />
                  <span className="headline9 text-dark-84818 my-auto">
                    By clicking Create account, I agree that I have read and
                    accepted the Terms of Use and Privacy Policy.
                  </span>
                </div>

                <p className="mx-auto headline8 flex gap-2 items-center">
                  Already have an account?
                  <Link href="/auth/login">
                    <span className="formbottomlink">Sign in</span>
                  </Link>
                </p>
              </div>
            </TabPanel>
          </Box>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Registration;
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
        <Box sx={{ p: 0 }}>
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
  };
}
