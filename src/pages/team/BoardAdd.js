import React, { useState, useEffect } from 'react';
import { useLocation, useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { onPostAdd } from '../../api/teamboard';
import { PurpleButton } from '../../components';
import { colors } from '../../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 8% 0 3% 18%;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 3%;
  width: 68%;
  justify-content: flex-end;
`;

const StyledInput = styled.input`
  width: 65%;
  height: 20px;
  opacity: 0.9;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 48px;
  font-size: 14px;
  padding: 12px;
  margin-right: 5px;
  margin-bottom: 1%;

  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

const StyledTextArea = styled.textarea`
  width: 65%;
  height: 300px;
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

const BoardAdd = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { teamId, channelId } = useParams();

  // 게시글 등록
  const onPostAddButton = (event) => {
    event.preventDefault();
    onPostAdd(teamId, channelId, title, content);
  };

  return (
    <Container>
      <h2>글쓰기</h2>
      <form onSubmit={onPostAddButton}>
        <StyledInput
          placeholder='제목'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <StyledTextArea
          type='text'
          placeholder='내용'
          value={content}
          maxLength={400}
          onChange={(e) => setContent(e.target.value)}
        />
        <ButtonContainer>
          <PurpleButton text='등록' type='submit' />
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default BoardAdd;
