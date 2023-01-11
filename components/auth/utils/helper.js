import * as yup from "yup";

// Login form validatin schema
export const loginSchema = yup.object().shape({
  userName: yup.string().required("You must enter user name "),

  password: yup.string().required("No password provided."),
});

// registration form validation schema
export const regiSchema = yup.object().shape({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  email: yup.string().required("An Email is required"),
  phoneNumber: yup.number().required("Phone number is required"),
  country: yup.string().required("Country is required"),
  countryCode: yup.string().required("Country Code is required"),
  state: yup.string().required("State/City is required"),
  zip: yup.string().required("Post Code is required"),
  address: yup.string().required("Address is required"),
  userName: yup.string().required("User Name is required"),
  companyWebsite: yup.string().required("Company Website is required"),
  companyName: yup.string().required("Company Name is required"),
  companyType: yup.string().required("Company Type is required"),
  password: yup
    .string()
    .required("A Password is required.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

// Contact form validation schema
export const contactSchema = yup.object().shape({
  fullname: yup.string().required("A Fullname is required"),
  companyName: yup.string().required("Company  is required"),
  email: yup
    .string()
    .email("Enter a valid Email")
    .required("An Email is required"),
  subject: yup.string().required("Required"),
});

// Reset password validation schema
export const resetpassschema = yup.object().shape({
  currentPassword: yup.string().required("No password provided."),

  newPassword: yup.string().required("No password provided."),
});

// Search Modal validation schema

export const searchmodalschema = yup.object().shape(
  {
    incorporated_from: yup.string(),
    
    // yup.lazy(() =>
    //   yup
    //     .string()
    //     .when(
    //       [
    //         "incorporated_to",
    //         "company_name",
    //         "sic_codes",
    //         "postal_code",
    //         "city",
    //       ],
    //       {
    //         is: (incorporated_to, company_name, sic_codes, postal_code, city) =>
    //           !incorporated_to &&
    //           !company_name &&
    //           !sic_codes &&
    //           !postal_code &&
    //           !city,
    //         then: yup.string().required(),
    //       }
    //     )
    // ),
    incorporated_to: yup.string(),
    
    // yup.lazy(() =>
    //   yup
    //     .string()
    //     .when(
    //       [
    //         "incorporated_from",
    //         "company_name",
    //         "sic_codes",
    //         "postal_code",
    //         "city",
    //       ],
    //       {
    //         is: (
    //           incorporated_from,
    //           company_name,
    //           sic_codes,
    //           postal_code,
    //           city
    //         ) =>
    //           !incorporated_from &&
    //           !company_name &&
    //           !sic_codes &&
    //           !postal_code &&
    //           !city,
    //         then: yup.string().required(),
    //       }
    //     )
    // ),
    city: yup.string(),
    
    // yup.lazy(() =>
    //   yup
    //     .string()
    //     .when(
    //       [
    //         "incorporated_to",
    //         "company_name",
    //         "sic_codes",
    //         "postal_code",
    //         "incorporated_from",
    //       ],
    //       {
    //         is: (
    //           incorporated_from,
    //           company_name,
    //           sic_codes,
    //           postal_code,
    //           incorporated_to
    //         ) =>
    //           !incorporated_from &&
    //           !company_name &&
    //           !sic_codes &&
    //           !postal_code &&
    //           !incorporated_to,
    //         then: yup.string().required(),
    //       }
    //     )
    // ),
    company_name: yup.string(),
    // yup.lazy(() =>
    //   yup
    //     .string()
    //     .when(
    //       [
    //         "incorporated_to",
    //         "city",
    //         "sic_codes",
    //         "postal_code",
    //         "incorporated_from",
    //       ],
    //       {
    //         is: (
    //           incorporated_from,
    //           city,
    //           sic_codes,
    //           postal_code,
    //           incorporated_to
    //         ) =>
    //           !incorporated_from &&
    //           !city &&
    //           !sic_codes &&
    //           !postal_code &&
    //           !incorporated_to,
    //         then: yup.string().required(),
    //       }
    //     )
    // ),
    sic_codes: yup.string(),
    
    // yup.lazy(() =>
    //   yup
    //     .string()
    //     .when(
    //       [
    //         "incorporated_to",
    //         "company_name",
    //         "city",
    //         "postal_code",
    //         "incorporated_from",
    //       ],
    //       {
    //         is: (
    //           incorporated_from,
    //           company_name,
    //           city,
    //           postal_code,
    //           incorporated_to
    //         ) =>
    //           !incorporated_from &&
    //           !company_name &&
    //           !city &&
    //           !postal_code &&
    //           !incorporated_to,
    //         then: yup.string().required(),
    //       }
    //     )
    // ),
    postal_code: yup.string()
    
    // yup.lazy(() =>
    //   yup
    //     .string()
    //     .when(
    //       [
    //         "incorporated_to",
    //         "company_name",
    //         "city",
    //         "sic_codes",
    //         "incorporated_from",
    //       ],
    //       {
    //         is: (
    //           incorporated_from,
    //           company_name,
    //           city,
    //           sic_codes,
    //           incorporated_to
    //         ) =>
    //           !incorporated_from &&
    //           !company_name &&
    //           !city &&
    //           !sic_codes &&
    //           !incorporated_to,
    //         then: yup.string().matches(new RegExp("[0-9]")).required(),
    //       }
    //     )
    // ),
  }
  // [
  //   ["incorporated_from", "company_name", "sic_codes", "postal_code", "city"],
  //   ["incorporated_to", "company_name", "sic_codes", "postal_code", "city"],
  //   [
  //     "incorporated_to",
  //     "company_name",
  //     "sic_codes",
  //     "postal_code",
  //     "incorporated_from",
  //   ],
  //   [
  //     "incorporated_to",
  //     "city",
  //     "sic_codes",
  //     "postal_code",
  //     "incorporated_from",
  //   ],
  //   [
  //     "incorporated_to",
  //     "company_name",
  //     "city",
  //     "postal_code",
  //     "incorporated_from",
  //   ],
  //   [
  //     "incorporated_to",
  //     "company_name",
  //     "city",
  //     "sic_codes",
  //     "incorporated_from",
  //   ],
  // ]
);

// company result search validation

export const resultSearchValidation = yup.object().shape({
  post_code: yup.string().required(),
  sic_code: yup.string().required(),
});
