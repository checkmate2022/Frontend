import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { BoardTable, PurpleButton } from '../../components/index';
import { useNavigate, useParams } from 'react-router-dom';
import { onChannelBoardGet } from '../../api/teamboard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 9% 0 3% 15%;
`;

const BoardContainer = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
  width: 90%;
  height: 600px;
  background-color: ${colors.white};
`;

const TitleText = styled.h2`
  color: ${colors.black};
  font-size: 25px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1%;
  width: 90%;
  justify-content: flex-end;
`;

const TeamChannel = () => {
  let navigate = useNavigate();
  const { channelId } = useParams();

  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  console.log(boardList);

  // 게시글 불러오기
  useEffect(() => {
    onChannelBoardGet(channelId, setBoardList);
  }, []);

  //글쓰기
  const onPostAddButton = () => {
    navigate('boardadd');
  };
  return (
    <Container>
      <TitleText>공지사항</TitleText>
      <ButtonContainer>
        <PurpleButton text='글쓰기' onClick={onPostAddButton} />
      </ButtonContainer>
      <BoardContainer>
        <BoardTable data={boardList} />
      </BoardContainer>
    </Container>
  );
};

export default TeamChannel;
