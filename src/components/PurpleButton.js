import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/theme';

const CheckButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.purple};
  border: none;
  border-radius: 48px;
  width: fit-content;
  height: fit-content;
  font-size: 13px;
  color: ${colors.white};
  padding: 5px 10px 5px 10px;
  cursor: pointer;

  &:hover {
    background: ${colors.purple};
  }

  &:active {
    box-shadow: ${colors.purple} 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.5) 0px 18px 36px -18px inset;
  }
`;

function PurpleButton({ text, type, onClick }) {
  return (
    <CheckButton onClick={onClick} type={type}>
      {text}
    </CheckButton>
  );
}

export default PurpleButton;
