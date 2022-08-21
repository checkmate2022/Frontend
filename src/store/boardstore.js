import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const channelState = atom({
  key: 'channelState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const boardState = atom({
  key: 'boardState',
  default: [],
});

export const commentState = atom({
  key: 'commentState',
  default: [],
});
