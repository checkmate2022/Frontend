import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';

const StyledSelect = styled.select`
  width: ${({ board }) => (board ? 'fit-content' : '80px')};
  height: 45px;
  opacity: 0.9;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 48px;
  font-size: 14px;
  margin: 0 5px 1% 0;
  padding: 5px;

  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

function DropBox({ options, defaultValue, setState, board }) {
  const onSelect = (e) => {
    setState(e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <StyledSelect onChange={onSelect}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={defaultValue === option.value}
          >
            {option.name}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
}

export default DropBox;
