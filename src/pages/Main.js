import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/theme';

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

const Main = () => {
  return (
    <Container>
      <TextContainer>
        <MainText>
          Enjoy your avatar
          <br /> meeting with <span>CLONE</span>.
        </MainText>
      </TextContainer>
      <PurpleContainer />
      <StyledImg alt='main' src='images/main_image.png' />
    </Container>
  );
};

export default Main;
