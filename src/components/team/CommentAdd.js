import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import PurpleButton from '../PurpleButton';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
`;

const StyledTextArea = styled.textarea`
  width: 90%;
  height: 70px;
  opacity: 0.9;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 25px;
  font-size: 14px;
  padding: 1.3%;
  resize: none;
  overflow: hidden;
  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

const StyledImage = styled.img`
  border-radius: 10px;
  width: 38px;
  height: 38px;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 8px;
  width: 5%;
`;

function CommentAdd({ userImage, onSubmit, content, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <Container>
        <StyledImage src={userImage} />
        <StyledTextArea
          type='text'
          placeholder='내용'
          value={content}
          maxLength={400}
          onChange={onChange}
        />
        <ButtonContainer>
          <PurpleButton text='등록' />
        </ButtonContainer>
      </Container>
    </form>
  );
}

export default CommentAdd;
