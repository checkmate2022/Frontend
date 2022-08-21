import { atom } from 'recoil';

export const mediaState = atom({
  key: 'mediaState',
  default: {
    video: true,
    mic: false,
  },
});

export const meetingState = atom({
  key: 'meetingState',
  default: [],
});
