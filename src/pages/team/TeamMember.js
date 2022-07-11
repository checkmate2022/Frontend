import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MemberBox } from '../../components';
import { onTeamMemberGet } from '../../api/team';
import { teamState } from '../../store/counter';
import { useRecoilValue } from 'recoil';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 8% 0 3% 11%;
`;

const MemberContainer = styled.div`
  margin: 1% 0 0 1%;
`;

const GridContainer = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  @media screen and (max-width: 718px) {
    gap: 3px;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  position: relative;
`;

const TeamMember = () => {
  const [memberList, setMemberList] = useState([]);

  const teamid = useRecoilValue(teamState);

  // 참여자 불러오기
  const onMemberGet = () => {
    onTeamMemberGet(setMemberList, teamid);
  };

  useEffect(() => {
    onMemberGet();
  }, []);

  return (
    <Container>
      <h2>참여자 목록</h2>
      <MemberContainer>
        <GridContainer>
          {memberList.map((member) => (
            <CardContainer key={member.userSeq}>
              <MemberBox member={member} />
            </CardContainer>
          ))}
        </GridContainer>
      </MemberContainer>
    </Container>
  );
};

export default TeamMember;
