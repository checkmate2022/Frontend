import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { mediaState } from './meetingstore';
import { userState } from './userstore';

const MeetingUser = () => {
  let connectionId = '';
  let audioActive = true;
  let videoActive = true;
  let nickname = '';
  let streamManager = null;
  let type = 'local';
  // const [connectionId, setConnectionId] = useState('');
  // const [audioActive, setAudioActive] = useState(media.mic);
  // const [videoActive, setVideoActive] = useState(media.video);
  // const [nickname, setNickname] = useState(userInfo.userName);
  // const [streamManager, setStreamManager] = useState(null);
  // const [type, setType] = useState('local');

  const setNickname = (nick) => {
    nickname = nick;
  };

  return {
    isAudioActive: () => audioActive,
    isVideoActive: () => videoActive,
    getConnectionId: () => connectionId,
    getNickname: () => nickname,
    getStreamManager: () => streamManager,
    isLocal: () => type === 'local',
    setAudioActive: (isAudioActive) => (audioActive = isAudioActive),
    setVideoActive: (isVideoActive) => (videoActive = isVideoActive),
    setStreamManager: (streamManager) => (streamManager = streamManager),
    setConnectionId: (conecctionId) => (connectionId = conecctionId),
    setNickname,
    setType: (type) => {
      if ((type === 'local') | (type === 'remote')) {
        type = type;
      }
    },
  };
};

export default MeetingUser;
