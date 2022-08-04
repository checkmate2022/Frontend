import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import OvVideo from './OvVideo';

const StreamContainer = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function UserVideo({ streamManager, count }) {
  const getNicknameTag = () => {
    // 사용자의 닉네임을 가져옴
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

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

  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          <StreamContainer style={getCount(count)}>
            <OvVideo streamManager={streamManager} />
            <div>{/* <p style={{ margin: 0 }}>{getNicknameTag()}</p> */}</div>
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
