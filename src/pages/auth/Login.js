import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthButton from '../../components/auth/AuthButton';
import { colors } from '../../styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.2px;
  margin: 30px 0 0 20px;
`;

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
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
        <SignupContainer>
          회원이 아니신가요? <StyledLink to='/signup'>회원가입</StyledLink>
        </SignupContainer>
      </form>
    </Container>
  );
};

export default Login;
