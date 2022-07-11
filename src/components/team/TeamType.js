import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { teamState, menuState } from '../../store/counter';
import styled from 'styled-components';
import { colors } from '../../styles/theme';

const Container = styled.div`
  width: 300px;
  height: 320px;
  background: ${colors.white};
  border: 1px solid ${colors.teamtype};
  border-radius: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledImg = styled.img`
  height: 38px;
  width: 38px;
  margin-bottom: 6%;
`;

const NameText = styled.span`
  color: ${colors.black};
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 3%;
`;

const StyledText = styled.span`
  color: ${colors.teamtypedetail};
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 2%;
`;

function TeamType({ team }) {
  // 파라미터
  const navigate = useNavigate();
  const teamid = team.teamSeq;
  const [type, setType] = useRecoilState(menuState);

  const setTeamid = useSetRecoilState(teamState);

  // 대시보드로 이동
  const onDashboard = () => {
    setTeamid(teamid);
    navigate(`${teamid}/dashboard`);
    setType('team');
  };

  return (
    <Container onClick={onDashboard}>
      <StyledImg alt='cartoon' src='images/teamtype_01.png' />
      <NameText>{team.teamName}</NameText>
      <StyledText>{team.teamDescription}</StyledText>
    </Container>
  );
}

export default TeamType;
