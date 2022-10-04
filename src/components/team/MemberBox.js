import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import GreyLabel from '../GreyLabel';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MemberContainer = styled.div`
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
const LeaderContainer = styled.div`
  position: absolute;
  top: -50px;
`;

function MemberBox({ member }) {
  return (
    <Container>
      <LeaderContainer>
        {member.teamRoleType === 'LEADER' ? <GreyLabel text='팀장' /> : null}
      </LeaderContainer>
      <MemberContainer>
        <ImgContainer>
          <StyledImg src={member.userImg} />
        </ImgContainer>
        <DetailContainer>
          <NameText>{member.username}</NameText>
          <StyledText>{member.userId}</StyledText>
        </DetailContainer>
      </MemberContainer>
    </Container>
  );
}

export default MemberBox;
