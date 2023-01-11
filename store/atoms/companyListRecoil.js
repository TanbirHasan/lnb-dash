import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({key:'companyListRecoil'})

export const companyListRecoilState = atom({
  key: "companyListRecoil",
  default: [],
  effects_UNSTABLE: [persistAtom]
});
