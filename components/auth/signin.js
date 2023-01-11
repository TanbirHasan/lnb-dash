import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Hidden, IconButton, InputAdornment, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
const LOGIN_URL = 'login';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import AuthLayout from './layout';
import { loginSchema } from './utils/helper';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Logo from '../../public/assets/logo.png';
import apiClient from "../../library/apis/api-client";

const Signin = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = React.useState(false);

  const defaultValues = {
    userName: '',
    password: '',
  };

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  const { isValid, dirtyFields, errors, isSubmitting } = formState;
  const onSubmit = (values) => {
    const data = {
      username: values.userName,
      password: values.password,
    };
    try {
      return new Promise((resolve, reject) => {
        apiClient.post(
            `/auth/login`,
            data
        ).then(response=>{
          console.log("logininfo",response.data)
          Cookies.set('token', response.data.token);
          enqueueSnackbar(response?.data?.message, { variant: 'success' });
          if(response?.data?.details.isAdmin){
            router.push('/dashboard')
          }
          else{
            router.push('/home');

          }
         
        
        }).catch(error=>{
          enqueueSnackbar(error.response?.data?.message, { variant: 'error' });
          reject(error);
        })
      })
        .then(()=>{})
        .catch(()=>{})
    } catch (error) {
      enqueueSnackbar('Failed. Please try again', { variant: 'error' });
    }
  };

  return (
    <AuthLayout>
      <form
        name="SigninForm"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-5 py-5 justify-start sm:justify-center items-center h-screen"
      >
        <Hidden smUp>
          <div className="flex justify-center items-center my-10">
            <Image src={Logo} alt="logo" className="h-20 w-full" />
          </div>
        </Hidden>
        <div className="headline4 mb-14">Sign in to Local New Business</div>
        <div className=" flex flex-col gap-5 items-center justify-between w-full md:w-96">
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                type="text"
                className="bg-white"
                autoFocus={true}
                placeholder="Username"
                helpertext={errors?.userName?.message}
                variant="outlined"
                error={!!errors?.userName}
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
                if (value === '') {
                  return 'Please provide input name';
                }
              },
            }}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Password"
                placeholder="Password"
                className="bg-white"
                autoFocus={true}
                autoComplete="new-password"
                type={showPassword ? 'text' : 'password'}
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
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="text-white hover:bg-primaryHover cursor-pointer my-5 capitalize p-4 w-full md:w-96 rounded-md font-bold shadow-none hover:shadow-none bg-primary"
          disabled={isSubmitting}
        >
          Sign In
        </button>

        <Link href="/auth/forget-password">
          <span className="mx-auto text-[#3294D1] cursor-pointer mb-5">
            Forget Password?
          </span>
        </Link>

        <p className="mx-auto">
          New User?
          <Link href="/auth/registration">
            <span className="text-blue-600 my-5 text-[color:var(--form-button-color)] cursor-pointer ml-1">
              Create an Account
            </span>
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signin;
