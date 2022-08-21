import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import {
  BoardTable,
  PurpleButton,
  Loading,
  Pagination,
} from '../../components/index';
import { useNavigate, useParams } from 'react-router-dom';
import { onChannelBoardGet } from '../../api/teamboard';
import { useRecoilValue } from 'recoil';
import { channelState } from '../../store/boardstore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 7% 0 0 13%;
`;

const BoardContainer = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
  width: 90%;
  height: 500px;
  background-color: ${colors.white};
`;

const TitleText = styled.h2`
  color: ${colors.black};
  font-size: 28px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1%;
  width: 90%;
  justify-content: flex-end;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1%;
`;

const TeamChannel = () => {
  let navigate = useNavigate();
  const { channelId } = useParams();
  const channelName = useRecoilValue(channelState);

  const [loading, setLoading] = useState(false);
  const [boardList, setBoardList] = useState([]);

  // 페이지
  const [currentPage, setCurrentPage] = useState(1);
  let postsPerPage = 10;

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  console.log(boardList, channelId);

  //게시글 불러오기
  useEffect(() => {
    onChannelBoardGet(channelId, setBoardList, setLoading);
  }, [channelName]);

  //글쓰기
  const onPostAddButton = () => {
    navigate('boardadd');
  };
  return (
    <>
      <Container>
        {loading ? <Loading /> : null}
        <TitleText>{channelName}</TitleText>
        <ButtonContainer>
          <PurpleButton text='글쓰기' onClick={onPostAddButton} />
        </ButtonContainer>
        <BoardContainer>
          <BoardTable data={currentPosts(boardList)} />
        </BoardContainer>
      </Container>
      <PageContainer>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={boardList.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </PageContainer>
    </>
  );
};

export default TeamChannel;
