import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { onLogout } from '../api/auth';
import { menuState, teamState } from '../store/userstore';
import { colors } from '../styles/theme';
import { useRecoilState, useResetRecoilState } from 'recoil';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 3% 0;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 17% 0 3% 20%;
  width: fit-content;
`;

const MainText = styled.h1`
  font-size: 43px;
  font-weight: 700;

  span {
    color: ${colors.lightpurple};
  }
`;

const PurpleContainer = styled.div`
  width: 290px;
  height: 600px;
  background: #d8bbf5;
  border-radius: 0px 0px 0px 30px;
  position: absolute;
  right: 0;
  z-index: 80;
`;

const StyledImg = styled.img`
  width: 400px;
  height: 400px;
  position: absolute;
  right: 15%;
  top: 25%;
  z-index: 89;
`;

const TextButton = styled.a`
  cursor: pointer;
  position: absolute;
  right: 5%;
  z-index: 999;
  top: 33px;
`;

const Main = () => {
  const resetTeamState = useResetRecoilState(teamState);
  const resetMenuState = useResetRecoilState(menuState);

  const onLoginButton = () => {
    resetTeamState();
    resetMenuState();
    onLogout();
  };

  return (
    <Container>
      <TextContainer>
        <MainText>
          Enjoy your avatar
          <br /> meeting with <span>CLONE</span>.
        </MainText>
      </TextContainer>
      <PurpleContainer />
      <TextButton onClick={onLoginButton}>로그아웃</TextButton>
      <StyledImg alt='main' src='images/main_image.png' />
    </Container>
  );
};

export default Main;
