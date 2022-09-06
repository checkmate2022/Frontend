import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const teamState = atom({
  key: 'teamState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const menuState = atom({
  key: 'menuState',
  default: 'main',
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: 'userState',
  default: [],
});

export const leaderState = atom({
  key: 'leaderState',
  default: '',
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
