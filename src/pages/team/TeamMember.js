import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MemberBox } from '../../components';
import { onTeamMemberGet } from '../../api/team';
import { teamState } from '../../store/userstore';
import { useRecoilValue } from 'recoil';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 8% 0 3% 11%;
`;

const MemberContainer = styled.div`
  margin: 5% 0 0 1%;
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
    onLeaderFirst();
  }, []);

  // 팀장 1등으로~
  const onLeaderFirst = () => {
    let mlist = memberList;
    memberList.map((member, idx) => {
      console.log(member, idx);
      if (member.teamRoleType === 'LEADER') {
        setMemberList(memberList.splice(0, 0, member));
        console.log(memberList.splice(0, 0, member));
      }
      console.log(memberList);
    });
  };
  const reverse = [];
  for (let i = memberList.length - 1; i >= 0; i--) {
    reverse.push(memberList[i]);
  }
  return (
    <Container>
      <h2>참여자 목록</h2>
      <MemberContainer>
        <GridContainer>
          {reverse.map((member) => (
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
