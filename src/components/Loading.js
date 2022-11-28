import React from 'react';
import styled from 'styled-components';
import spinner from '../styles/icons/spinner2.gif';

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  text-align: center;
`;

function Loading() {
  return (
    <Background>
      <img src={spinner} width='6%' alt='로딩중' />
      <LoadingText>로딩중..</LoadingText>
    </Background>
  );
}

export default Loading;
