import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthButton from '../../components/auth/AuthButton';
import { colors } from '../../styles/theme';
import { loginApi } from '../../api/auth';
import { useResetRecoilState } from 'recoil';
import { menuState, teamState } from '../../store/userstore';
import { SocialLogin } from '../../components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 30% 0 5% 0;
`;

const StyledInput = styled.input`
  font-size: 18px;
  border: none;
  outline: none;
  margin: 13px;
`;

const Line = styled.hr`
  width: 480px;
  height: 0px;
  left: 455px;
  top: 435px;
  border: 0.1px solid ${colors.black};
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: underline;
  cursor: pointer;
`;

const SignupContainer = styled.div`
  font-size: 17px;
  line-height: 24px;
  letter-spacing: -0.2px;
  margin: 3% 0 0 20px;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: ${colors.red};
  font-weight: 400;
  margin: 2% 0 0 2%;
`;

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const resetTeamState = useResetRecoilState(teamState);
  const resetMenuState = useResetRecoilState(menuState);

  // 팀, 메뉴 atom 값 초기화(추후 세션스토리지로 변경 고민)
  useEffect(() => {
    resetTeamState();
    resetMenuState();
  });

  const onSubmit = (event) => {
    event.preventDefault();
    if (id !== '' && password !== '') {
      loginApi(id, password, setError);
    } else if (id === '') {
      setError('아이디를 입력해주세요.');
    } else if (password === '') {
      setError('비밀번호를 입력해주세요.');
    }
  };
  return (
    <div>
      <TitleContainer>
        <h1 style={{ fontWeight: 600, fontSize: '55px' }}>AvaTwin</h1>
      </TitleContainer>
      <Container>
        <form onSubmit={onSubmit}>
          <StyledInput
            name='id'
            placeholder='아이디'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Line />
          <StyledInput
            name='password'
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthButton width='login' text='로그인' />
          <ErrorMessage>{error}</ErrorMessage>
          <SignupContainer>
            회원이 아니신가요? <StyledLink to='/signup'>회원가입</StyledLink>
          </SignupContainer>
          <SocialLogin />
        </form>
      </Container>
    </div>
  );
};

export default Login;
