import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';

const Container = styled.div`
  width: 300px;
  height: 290px;
  background: ${colors.avatarcolor[2]};
  border-radius: 48px;
  display: flex;
  flex-direction: column;
`;

const StyledText = styled.span`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 2%;
`;

const NameText = styled.span`
  color: ${colors.black};
  font-size: 24px;
  font-weight: 700;
`;

const StyledImg = styled.img`
  height: 100px;
  width: 100px;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  margin: 15% 0 0 8%;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: fit-content;
  flex-direction: column;
  margin: 7% 0 0 8%;
`;

function MemberBox({ member }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex' }}>
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginRight: '30px',
          }}
        >
          {avatar ? <GreyLabel text='팀장' /> : <></>}
        </div> */}
        <Container key={member.userSeq}>
          <ImgContainer>
            <StyledImg src={''} />
          </ImgContainer>
          <DetailContainer>
            <NameText>{member.username}</NameText>
            <StyledText>{member.userId}</StyledText>
          </DetailContainer>
        </Container>
      </div>
    </div>
  );
}

export default MemberBox;
