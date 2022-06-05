import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width == 'login' ? '500px' : '100%')};
  height: 53px;
  background: ${colors.purple};
  border: none;
  border-radius: 48px;
  color: ${colors.black};
  font-size: 18px;
  margin-top: 29px;
  cursor: pointer;
`;

function AuthButton({ text, width }) {
  return <Button width={width}>{text}</Button>;
}

export default AuthButton;
