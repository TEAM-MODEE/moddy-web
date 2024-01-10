import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { STATUS } from '@/views/SignUpPage/constants/requestStatus';
export interface inputDataType {
  data: string;
  verifyStatus: boolean;
}
const { persistAtom } = recoilPersist();

export const userTypeState = atom({
  key: 'userType',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const nameState = atom<inputDataType>({
  key: 'name',
  default: {
    data: '',
    verifyStatus: false,
  },
});

export const birthYearState = atom<inputDataType>({
  key: 'birthYear',
  default: {
    data: '',
    verifyStatus: false,
  },
});

export const genderState = atom<inputDataType>({
  key: 'gender',
  default: {
    data: '',
    verifyStatus: false,
  },
});

interface verificationDataType {
  data: string;
  status: number;
}

export const phoneNumberState = atom<verificationDataType>({
  key: 'phoneNumber',
  default: {
    data: '',
    status: STATUS.NOT_AVAILABLE,
  },
});

export const verifyCodeState = atom<verificationDataType>({
  key: 'verityCode',
  default: {
    data: '',
    status: STATUS.NOT_AVAILABLE,
  },
});

export interface preferRegionDataType {
  data: boolean[];
  verifyStatus: boolean;
}

export const preferRegionState = atom<preferRegionDataType>({
  key: 'preferRegion',
  default: {
    data: [],
    verifyStatus: false,
  },
});
