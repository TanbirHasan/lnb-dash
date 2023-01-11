import * as React from 'react';
import { useEffect, useState } from 'react';

import Image from 'next/future/image';
import logoText from '../../../public/assets/logotext.png';
import companyicon from '../../../public/assets/companyicon.png';

import PropTypes from 'prop-types';
import { Tab, Tabs, Box, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useSnackbar } from 'notistack';
import apiClient from '../../../library/apis/api-client';
import Navbar from '../../Layout/Navbar/Navbar';
import Footer from '../../Layout/Footer/Footer';
import axios from 'axios';
import { useRouter } from 'next/router';
const COMPANY_NUMBER = 'company/profile';
const USER_NUMBER = 'company/pws';

const Companyprofile = () => {
  const { query } = useRouter();

  const [value, setValue] = useState(0);
  const [showChild, setShowChild] = useState(false);
  const [company, setCompany] = useState();
  const [director, setDirector] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const compnayProfile = async () => {
    try {
      const response = await axios.all([
        apiClient.get(`/${COMPANY_NUMBER}/${query.slug}`),
        apiClient.get(`${USER_NUMBER}/${query.slug}`),
      ]);
      //console.log('response1', response);
      if (response === 'undefined') {
        // enqueueSnackbar('Loading', { variant: 'success' });
      } else {
        setCompany(response[0]?.data.data);
        setDirector(response[1]?.data?.data?.items[0]);
      }

      if (response.status === 200) {
        //  enqueueSnackbar(response.statusText, { variant: 'success' });
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        // enqueueSnackbar(err.response.data.message, { variant: 'error' });
      }
    }
  };

  useEffect(() => {
    setShowChild(true);
    compnayProfile();
  }, [query.slug]);

  if (!showChild) {
    return null;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            <Typography>{children}</Typography>
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Navbar />
      <section className="section-style">
        <div className="bg-[#3294D1] md:min-h-[285px] sm:min-h-[285px] min-h-[200px] sm:p-12 p-5 rounded-xl">
          <div className=" flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src={companyicon}
                alt="payment method"
                className="sm:h-max h-[15%]"
              />

              <h2 className="text-white font-bold sm:ml-4 ml-2 text-[10px] sm:text-[15px] text-left mt-0 sm:mt-1">
                COMPANY DETAILS
              </h2>
            </div>

            <div className="">
              <a
                className="flex bg-[#D16F32] text-white sm:text-[14px] text-[12px] cursor-pointer px-4 md:py-3 py-2 rounded-md items-center"
                href="#"
              >
                <span className="mr-2">
                  {' '}
                  <LanguageIcon />
                </span>
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div className="flex bg-white rounded-xl mt-[-90px] mx-5 sm:mx-12 pb-8  shadow-xl">
          <Image
            src={logoText}
            alt="logo text"
            className="mt-[-30px] md:mx-6 mx-3  border rounded-full bg-white md:max-w-[176px] md:max-h-[176px] max-w-[120px] max-h-[120px] object-scale-down"
          />
          <div className="flex flex-col justify-center items-start">
            <h1 className="headline1 uppercase font-bold lg:text-[26px] md:text-[26px] sm:text-[20px] text-sm my-2">
              {company?.company_name}
            </h1>
            <h4 className="text-[12px] md:text-sm font-medium">
              Real Estate Agencies
            </h4>
          </div>
        </div>
      </section>
      <div className="section-style">
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              height: '55px',
              background: '#FFFFF',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)',
              borderRadius: '10px',
              padding: '7px 0px',
            }}
          >
            <Tabs
              TabIndicatorProps={{
                style: { background: '#D16F32' },
              }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example "
            >
              <Tab
                style={{
                  textTransform: 'none',
                  color: value === 0 ? '#D16F32' : '#909090',
                  fontSize: 17,
                  fontWeight: value === 0 ? 'bold' : '',
                }}
                label="General"
                {...a11yProps(0)}
              />
              <Tab
                style={{
                  textTransform: 'none',
                  color: value === 1 ? '#D16F32' : '#909090',
                  fontSize: 17,
                  fontWeight: value === 1 ? 'bold' : '',
                }}
                label="Director"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="text-xl py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl font-bold text-[#797979]">
              GENERAL
            </div>
            <div className='companyprofile-table'>
                <table className="w-full shadow-lg rounded-2xl">
                  <tbody>
                    <tr>
                      <td>Name: </td>
                      <td>{company?.company_name}</td>
                    </tr>
                    <tr>
                      <td>Company Status: </td>
                      <td>{company?.company_status}</td>
                    </tr>
                    <tr>
                      <td>Date of Creation: </td>
                      <td>{company?.date_of_creation}</td>
                    </tr>
                    <tr>
                      <td>Type: </td>
                      <td>{company?.type}</td>
                    </tr>
                    <tr>
                      <td>Postal Code: </td>
                      <td>{company?.registered_office_address?.postal_code}</td>
                    </tr>
                    <tr>
                      <td>Address: </td>
                      <td>
                        {' '}
                        {company?.registered_office_address?.region}
                        {company?.registered_office_address?.country},{' '}
                        {company?.registered_office_address?.locality},{' '}
                        {company?.registered_office_address?.address_line_1}
                      </td>
                    </tr>
                    <tr>
                      <td>SIC Code: </td>
                      <td>
                        {company?.sic_codes?.map((item, index) => (
                          <span key={index}>{item},</span>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="text-xl py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl font-bold text-[#797979]">
              DIRECTOR
            </div>
            <div className='companyprofile-table'> 
                <table className="w-full shadow-lg rounded-2xl">
                  <tbody>
                    <tr>
                      <td>Director name: </td>
                      <td>{director?.name}</td>
                    </tr>
                    <tr>
                      <td>Notified on: </td>
                      <td>{director?.notified_on}</td>
                    </tr>
                    <tr>
                      <td>Date of birth: </td>
                      <td>
                        {director?.date_of_birth?.month}/
                        {director?.date_of_birth?.year}
                      </td>
                    </tr>
                    <tr>
                      <td>Nationality: </td>
                      <td>{director?.nationality}</td>
                    </tr>
                    <tr>
                      <td>Kind: </td>
                      <td className="capitalize">
                        {director?.kind.replace(/-/g, ' ')}
                      </td>
                    </tr>
                    <tr>
                      <td>Country of residence: </td>
                      <td>{director?.country_of_residence}</td>
                    </tr>
                    <tr>
                      <td>Links: </td>
                      <td>{director?.name}</td>
                    </tr>
                    <tr>
                      <td>Address: </td>
                      <td>{`${director?.address?.address_line_1}, ${director?.address?.locality}, ${director?.address?.country} `}</td>
                    </tr>
                    <tr>
                      <td>Natures of control: </td>
                      <td>
                        {director?.natures_of_control?.map((item) => (
                          <>
                            <span className="capitalize">
                              {item.replace(/-/g, ' ')}
                            </span>
                            ,
                          </>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td>Etag:</td>
                      <td>{director?.etag}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </TabPanel>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default Companyprofile;
