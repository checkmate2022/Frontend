import React from 'react';
import styled from 'styled-components';
import { googlelogin, naverlogin, kakaoicon } from '../../styles/icons';
import { colors } from '../../styles/theme';

const Container = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NaverImg = styled.img`
  width: 55px;
  height: 55px;
  margin: 0 18px 0 15px;
`;

const GoogleImg = styled.img`
  width: 64px;
  height: 64px;
`;

const KakaoContainer = styled.div`
  background-color: ${colors.kakao};
  width: 56px;
  height: 56px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SocialLogin({}) {
  return (
    <Container>
      {/* <span>소셜로그인</span> */}
      <IconContainer>
        <a
          href='http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth2/redirect'
          role='button'
        >
          <GoogleImg src={googlelogin} alt='구글로그인' />
        </a>
        <a
          href='http://localhost:8080/oauth2/authorization/naver?redirect_uri=http://localhost:3000/oauth2/redirect'
          role='button'
        >
          <NaverImg src={naverlogin} alt='네이버로그인' />
        </a>
        <a
          href='http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth2/redirect'
          role='button'
        >
          <KakaoContainer>
            <img src={kakaoicon} />
          </KakaoContainer>
        </a>
      </IconContainer>
    </Container>
  );
}

export default SocialLogin;
