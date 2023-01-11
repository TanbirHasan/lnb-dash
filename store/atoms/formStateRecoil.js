import { atom } from "recoil";
import { companyListRecoilState } from "./companyListRecoil";

export const formStateRecoil = atom({
  key: "formStateRecoil",
  default: {
    step_two: companyListRecoilState,
    step_three: "",
    step_four: {},
  },
});
