import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { onTeamAllGet } from '../../api/team';
import { PurpleButton } from '../../components';
import TeamType from '../../components/team/TeamType';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 9% 0 3% 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 2%;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;

const TeamContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
`;

const GridContainer = styled.div`
  width: 100%;
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

const Teammain = () => {
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    onTeamAllGet(setTeamList);
  }, []);

  // 팀 생성 페이지로 이동
  const onAddPage = () => {
    window.location.href = '/teamadd';
  };

  return (
    <Container>
      <ButtonContainer>
        <PurpleButton text='생성' onClick={onAddPage} />
      </ButtonContainer>
      {teamList.length === 0 ? (
        <>
          <CenterContainer>
            <h2>생성된 프로젝트가 없습니다.</h2>
          </CenterContainer>
        </>
      ) : (
        <TeamContainer>
          <GridContainer>
            {teamList.map((team) => (
              <CardContainer key={team.teamSeq}>
                <TeamType team={team} />
              </CardContainer>
            ))}
          </GridContainer>
        </TeamContainer>
      )}
    </Container>
  );
};

export default Teammain;
