import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { PurpleButton, MemberSearchModal } from '../../components';
import { onTeamAdd } from '../../api/team';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 10% 0 3% 11%;
  width: 80%;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 3%;
  width: 63%;
  justify-content: flex-end;
`;

const StyledInput = styled.input`
  position: relative;
  width: 60%;
  height: 20px;
  opacity: 0.9;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 48px;
  font-size: 14px;
  padding: 12px;
  margin: 0 5px 1% 0;

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

const TeamAdd = () => {
  const [teamName, setTeamName] = useState('');
  const [teamDetail, setTeamDetail] = useState('');

  // 참여자 리스트
  const [memberList, setMemberList] = useState([]);

  // 팀 등록
  const onTeamAddButton = () => {
    let namelist = [];
    memberList.map((member) => namelist.push(member.username));
    onTeamAdd(teamName, teamDetail, namelist);
  };

  return (
    <Container>
      <h2>팀 생성</h2>
      <StyledInput
        placeholder='팀 이름'
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <MemberSearchModal
        setMemberList={setMemberList}
        memberList={memberList}
        type='useradd'
      />

      <StyledTextArea
        type='text'
        placeholder='팀 설명'
        value={teamDetail}
        maxLength={400}
        onChange={(e) => setTeamDetail(e.target.value)}
      />
      <ButtonContainer>
        <PurpleButton text='등록' onClick={onTeamAddButton} />
      </ButtonContainer>
    </Container>
  );
};

export default TeamAdd;
