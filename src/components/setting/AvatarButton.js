import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';

const RadioText = styled.span`
  font-size: 16px;
  width: 100px;
  height: 35px;
  background: ${colors.grey3};
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${colors.black};
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${RadioText} {
    background: ${colors.purple};
    color: ${colors.white};
  }
  display: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1% 0 1% 0;
`;

function AvatarButton({ datas, checkedvalue, onChange }) {
  return (
    <Container>
      {datas.map((data) => (
        <label key={data} style={{ marginRight: '1%' }}>
          <RadioButton
            type='radio'
            value={data}
            checked={checkedvalue === data}
            onChange={onChange}
          />
          <RadioText>{data}</RadioText>
        </label>
      ))}
    </Container>
  );
}

export default AvatarButton;
