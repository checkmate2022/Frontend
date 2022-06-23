import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/theme';

const CheckButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.grey3};
  border: none;
  border-radius: 48px;
  width: ${(width) => width};
  height: ${(height) => height};
  font-size: 12px;
  color: ${colors.black};
  padding: 0 6px 0 6px;
  cursor: pointer;

  &:hover {
    background: #d8d8d8;
  }

  &:active {
    box-shadow: #d8d8d8 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.5) 0px 18px 36px -18px inset;
  }
`;

function GreyButton({ text, type, onClick, width, height }) {
  return (
    <CheckButton onClick={onClick} width={width} height={height} type={type}>
      {text}
    </CheckButton>
  );
}

export default GreyButton;
