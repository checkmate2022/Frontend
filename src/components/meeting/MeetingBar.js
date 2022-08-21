import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from 'react-icons/bs';
import PurpleButton from '../PurpleButton';

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

function MeetingBar({
  isVideo,
  isMic,
  onVideoSetting,
  onMicSetting,
  leaveSession,
}) {
  return (
    <BarContainer>
      <IconContainer>
        {isVideo ? (
          <BsFillCameraVideoFill onClick={onVideoSetting} style={iconstyle} />
        ) : (
          <BsFillCameraVideoOffFill
            onClick={onVideoSetting}
            style={iconstyle}
          />
        )}
        <div style={{ width: '20px' }} />
        {isMic ? (
          <BsFillMicFill onClick={onMicSetting} style={iconstyle} />
        ) : (
          <BsFillMicMuteFill onClick={onMicSetting} style={iconstyle} />
        )}
        <div style={{ width: '20px' }} />

        <PurpleButton text='나가기' onClick={leaveSession} />
      </IconContainer>
    </BarContainer>
  );
}

const iconstyle = {
  cursor: 'pointer',
  width: '30px',
  height: '30px',
};

export default MeetingBar;
