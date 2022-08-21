import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const loadingstate = atom({
  key: 'loadingstate',
  default: {
    inProgress: false,
    spinner: () => {},
  },
});

// export const getUserSelector = selector({
//   key: 'user/get',
//   get: async ({ get }) => {
//     try {
//       const { data } = await onUserIdInfoGet();
//       return data;
//     } catch (err) {
//       throw err;
//     }
//   },
//   set: ({ set }, newValue) => {
//     set(userState, newValue);
//   },
// });
