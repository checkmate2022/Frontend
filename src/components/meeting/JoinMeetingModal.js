import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from 'react-icons/bs';
import MeetingAvatar from './MeetingAvatar';
import PurpleButton from '../PurpleButton';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { mediaState, meetingState } from '../../store/meetingstore';
import { useNavigate } from 'react-router-dom';
import { teamState, userState } from '../../store/userstore';
import { onUserInfoGet } from '../../api/auth';
import Loading from '../Loading';
import { onCreateSession } from '../../api/meeting';
import { onAvatarAllGet } from '../../api/avatar';

const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '7px',
  },
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
  height: fit-content;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

function JoinMeetingModal({ modalIsOpen, setIsOpen }) {
  let navigate = useNavigate();
  const videoRef = useRef(null);

  const [isVideo, setIsVideo] = useState(true);
  const [isMic, setIsMic] = useState(false);

  const setMedia = useSetRecoilState(mediaState);
  const meetingInfo = useRecoilState(meetingState);
  let meetingId = meetingInfo[0].meetingId;
  const teamId = useRecoilState(teamState);

  const devices = navigator.mediaDevices.enumerateDevices();
  console.log(devices);

  // 아바타 스타일
  const [avatarList, setAvatarList] = useState([]);
  const [avatarStyle, setAvatarStyle] = useState(undefined);

  // 내 정보
  const setUserInfo = useSetRecoilState(userState);
  const [loading, setLoading] = useState(true);

  // 아바타 불러오기
  useEffect(() => {
    onAvatarAllGet(setAvatarList);
  }, []);

  // 내 정보 불러오기
  useEffect(() => {
    onUserInfoGet(setUserInfo, setLoading);
  }, []);

  // 오디오 얻기
  const getAudio = async (callback) => {
    try {
      const constraints = {
        video: true,
        audio: true,
      };
      await navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  useEffect(() => {
    getAudio((stream) => {
      const audioTrack = stream.getAudioTracks()[0];
      if (videoRef && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;

        audioTrack.enabled = !audioTrack.enabled;
        window.localStream = stream;
      }
    });
    // return () => {
    //   window.localStream.getTracks().forEach((track) => {
    //     track.stop();
    //   });
    // };
  }, []);

  useEffect(() => {
    setMedia({ video: isVideo, mic: isMic });
  }, [isVideo, isMic]);

  // 카메라 조정
  const onVideoSetting = () => {
    const nstream = videoRef.current.srcObject;
    const videoTrack = nstream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsVideo((prev) => !prev);
  };

  // 마이크 조정
  const onMicSetting = () => {
    const nstream = videoRef.current.srcObject;
    const audioTrack = nstream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsMic((prev) => !prev);
  };

  // 회의에서 사용할 아바타 선택
  const onAvatarSelect = (e) => {
    setAvatarStyle(e.target.value);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 회의 생성
  const createSession = () => {
    if (avatarStyle === undefined) {
      onCreateSession(meetingId);
      alert('아바타를 선택해주세요!');
    } else {
      //window.location.href = `/team/${teamId}/meeting/${meetingId}`;
      navigate(`/team/${teamId}/meeting/${meetingId}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {loading ? <Loading /> : null}
      <div style={{ display: 'flex' }}>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          ariaHideApp={false}
          onRequestClose={closeModal}
        >
          <ModalContainer>
            <h2>아바타 선택</h2>
            <video ref={videoRef} autoPlay width='0px' height='0px' />
            <MeetingAvatar
              avatarList={avatarList}
              checkedvalue={avatarStyle}
              onChange={onAvatarSelect}
            />
            <IconContainer>
              {isVideo ? (
                <BsFillCameraVideoFill
                  onClick={onVideoSetting}
                  style={iconstyle}
                />
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
            </IconContainer>
            <PurpleButton text='회의 입장' onClick={createSession} />
          </ModalContainer>
        </Modal>
      </div>
    </div>
  );
}

const iconstyle = {
  cursor: 'pointer',
  width: '30px',
  height: '30px',
};

const avatardata = [
  {
    avatarSeq: 1,
    avatarName: '아바타1',
    avatarDescription: 'string',
    avatarOriginUrl: 'string',
    avatarCreatedUrl: 'string',
    avatarStyle: 'cartoon',
    avatarStyleId: 35,
    avatarDate: '2022-07-26T09:03:26.955Z',
    isBasic: true,
    '@id': 1,
  },
  {
    avatarSeq: 2,
    avatarName: '아바타2',
    avatarDescription: 'string',
    avatarOriginUrl: 'string',
    avatarCreatedUrl: 'string',
    avatarStyle: 'cartoon',
    avatarStyleId: 35,
    avatarDate: '2022-07-26T09:03:26.955Z',
    isBasic: true,
    '@id': 2,
  },
  {
    avatarSeq: 3,
    avatarName: '아바타3',
    avatarDescription: 'string',
    avatarOriginUrl: 'string',
    avatarCreatedUrl: 'string',
    avatarStyle: 'cartoon',
    avatarStyleId: 35,
    avatarDate: '2022-07-26T09:03:26.955Z',
    isBasic: true,
    '@id': 3,
  },
];

export default JoinMeetingModal;
