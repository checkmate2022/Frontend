import { atom } from 'recoil';
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
