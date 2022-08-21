import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { PurpleButton, MemberSearchModal } from '../../components';
import { useRecoilValue } from 'recoil';
import { leaderState, teamState } from '../../store/userstore';
import {
  onTeamChange,
  onTeamDelete,
  onTeamInfoGet,
  onTeamMemberGet,
} from '../../api/team';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 11% 0 3% 10%;
  width: 80%;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 3%;
  width: 63%;
  justify-content: flex-end;
`;

const StyledInput = styled.input`
  width: 60%;
  height: 20px;
  opacity: 0.9;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 48px;
  font-size: 14px;
  padding: 12px;
  margin-right: 5px;
  margin-bottom: 1%;

  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

const StyledTextArea = styled.textarea`
  width: 60%;
  height: 150px;
  opacity: 0.9;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 25px;
  font-size: 14px;
  padding: 1.3%;
  resize: none;
  overflow: hidden;
  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

const TeamSetting = () => {
  const [teamName, setTeamName] = useState('');
  const [teamMember, setTeamMember] = useState([]);
  const [teamDetail, setTeamDetail] = useState('');

  const teamId = useRecoilValue(teamState);

  // 팀 정보 불러오기
  useEffect(() => {
    onTeamInfoGet(teamId, setTeamName, setTeamDetail);
    onTeamMemberGet(setTeamMember, teamId);
  }, []);

  // 팀 삭제
  const onTeamDeleteButton = () => {
    onTeamDelete(teamId);
  };

  // 팀 관리 수정
  const onTeamChangeButton = () => {
    let namelist = [];
    teamMember.map((member) => {
      if (member.teamRoleType === 'MEMBER') {
        namelist.push(member.username);
      }
    });

    onTeamChange(teamId, teamName, teamDetail, namelist);
  };

  return (
    <Container>
      <h2>팀 관리</h2>
      <StyledInput
        placeholder='팀 이름'
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <MemberSearchModal
        setMemberList={setTeamMember}
        memberList={teamMember}
        type='user'
      />

      <StyledTextArea
        type='text'
        placeholder='팀 설명'
        value={teamDetail}
        maxLength={400}
        onChange={(e) => setTeamDetail(e.target.value)}
      />
      <ButtonContainer>
        <PurpleButton text='수정' onClick={onTeamChangeButton} />
        <div style={{ width: '1%' }} />
        <PurpleButton text='팀 삭제' onClick={onTeamDeleteButton} />
      </ButtonContainer>
    </Container>
  );
};

export default TeamSetting;
