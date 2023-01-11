import { atom, selector } from "recoil";

export const paginationRecoil = atom({
  key: "paginationRecoil",
  default: {
    company_name: "",
    postal_code: "",
    sic_codes: "",
    incorporated_from: "",
    incorporated_to: "",
    limit: "",
    city: "",
    sort_by: "",
    page: 1,
    total: 0,
    noTotalPage: 0,
  },
});

// export const updatePagination = selector({ß
//   key: 'updatePaginationRecoil',
//   get: (data) => {
//     console.log("data ->", data)
//   },
//   set: ( { get, set} ) => {
//     set()
//   }
// })