import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const accountState = atom({
  key: "accountState",
  effects_UNSTABLE: [persistAtom],
  default: null,
});
