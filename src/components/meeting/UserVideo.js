import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import OvVideo from './OvVideo';

const StreamContainer = styled.li`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Video = styled.video`
  // width: 100%;
  // height: auto;
  // float: left;
  // // cursor: pointer;

  width: 80%;
  height: 80%;
  //object-fit: none;
  object-fit: contain;

  /*Mirror code starts*/
  // transform: rotateY(180deg);
  // -webkit-transform:rotateY(180deg); /* Safari and Chrome */
  // -moz-transform:rotateY(180deg); /* Firefox */
  /*Mirror code ends*/
`;

function UserVideo({ streamManager, count }) {
  const videoRef = useRef();

  // const getNicknameTag = () => {
  //   // 사용자의 닉네임을 가져옴
  //   return JSON.parse(streamManager.stream.connection.data).userName;
  // };

  const getCount = (number) => {
    switch (number) {
      case 1:
        return videostyles.one;
      case 2:
        return videostyles.two;
      case 3:
      case 4:
        return videostyles.multi;
      // default:
      //   throw new Error('제한 인원을 넘었습니다');
    }
  };

  useEffect(() => {
    if (videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  console.log('streamManager' + streamManager);
  //console.log('비디오닉네임' + getNicknameTag());
  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          <StreamContainer style={videostyles.one}>
            <Video autoPlay={true} ref={videoRef} />
            {/* <p>{getNicknameTag()}</p>
            <div>
              <p style={{ margin: 0 }}>{getNicknameTag()}</p>
            </div> */}
          </StreamContainer>
        </div>
      ) : null}
    </div>
  );
}

const videostyles = {
  one: {
    width: '100%',
    height: '100%',
  },
  two: {
    width: '50%',
    height: '100%',
  },
  multi: {
    width: '50%',
    height: '50%',
  },
};
export default UserVideo;
