import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/theme';

const Label = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.grey};
  border-radius: 48px;
  width: ${({ width }) => (width ? width : 'fit-content')};
  height: 26px;
  font-size: 14px;
  color: ${colors.black};
  padding: 0 27px 0 27px;
`;

function GreyLabel({ text, width }) {
  return <Label width={width}>{text}</Label>;
}

export default GreyLabel;
