import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import moment from 'moment';
import { CommentAdd, CommentList, PurpleButton } from '../../components';
import {
  onCommentAdd,
  onCommentGet,
  onPostDelete,
  onBoardGet,
} from '../../api/teamboard';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  channelState,
  commentState,
  emoticonModalState,
  selectedEmoticonState,
} from '../../store/boardstore';
import { onUsernameInfoGet } from '../../api/auth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 7% 0 3% 13%;
`;

const BoardContainer = styled.div`
  //box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
  width: 90%;
  height: 400px;
  background-color: ${colors.white};
  padding: 0 40px 40px 40px;
`;

const Line = styled.hr`
  width: 100%;
  height: 0px;
  border: 1px solid ${colors.grey3};
`;

const StyledImage = styled.img`
  border-radius: 10px;
  width: 38px;
  height: 38px;
`;

const NameText = styled.span`
  font-size: 13px;
  margin-left: 4px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  //margin-top: 10%;
  padding: 40px;
  width: 90%;
`;

const ClistContainer = styled.div`
  padding: 20px;
  margin-top: 20px;
  margin-right: 20px;
`;

const TitleText = styled.h2`
  color: ${colors.black};
  font-size: 28px;
  cursor: pointer;
`;

const TeamBoard = () => {
  const { teamId, channelId, boardId } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const channelName = useRecoilValue(channelState);

  // 댓글
  const [content, setContent] = useState('');
  const [commentList, setCommentList] = useRecoilState(commentState);
  const [selectedIdx, setSelectedIdx] = useState();
  const [emoticonUrl, setEmoticonUrl] = useState('');
  const [selectedEmoticon, setSelectedEmoticon] = useRecoilState(
    selectedEmoticonState
  );

  // 게시글 정보
  const [board, setBoard] = useState([]);

  // 게시글 수정
  const onBoardChangeMove = () => {
    navigate('change', { state: { item: board } });
  };

  // 게시글 삭제
  const onBoardDeleteButton = () => {
    onPostDelete(teamId, boardId, channelId);
  };

  // 댓글 등록
  const onCommentAddButton = (event) => {
    event.preventDefault();
    onCommentAdd(boardId, content, emoticonUrl, setCommentList);
    setContent('');
    setEmoticonUrl('');
    setSelectedEmoticon('');
  };

  useEffect(() => {
    onCommentGet(boardId).then((result) => setCommentList(result));
    onBoardGet(boardId, setBoard);
    onUsernameInfoGet(setUserName);
  }, []);

  return (
    <Container>
      <TitleText
        onClick={() => navigate(`/team/${teamId}/teamchannel/${channelId}`)}
      >
        {channelName}
      </TitleText>
      <BoardContainer>
        {board.username === userName ? (
          <ButtonContainer>
            <PurpleButton text='수정' onClick={onBoardChangeMove} />
            <div style={{ width: '10px' }} />
            <PurpleButton text='삭제' onClick={onBoardDeleteButton} />
          </ButtonContainer>
        ) : null}

        <h2>{board.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <StyledImage src={board.userImage} />
          <ProfileContainer>
            <NameText>{board.username}</NameText>
            <NameText>
              {moment(board.createDate).format('YYYY/MM/DD  hh:mm')}
            </NameText>
          </ProfileContainer>
        </div>
        <Line />
        <p style={{ padding: '8px' }}>{board.content}</p>
      </BoardContainer>
      <CommentContainer>
        <Line />
        <h3>댓글</h3>
        <CommentAdd
          onSubmit={onCommentAddButton}
          userImage={
            'https://checkmatebucket.s3.ap-northeast-2.amazonaws.com/avatar/melon.png'
          }
          content={content}
          setEmoticonUrl={setEmoticonUrl}
          onChange={(e) => setContent(e.target.value)}
        />
        <ClistContainer>
          {commentList.map((comment, idx) => (
            <CommentList
              key={comment.commentSeq}
              comment={comment}
              boardId={board.boardSeq}
              onEdit={() => setSelectedIdx(idx)}
              isEdit={selectedIdx === idx ? true : false}
              resetIdx={() => setSelectedIdx()}
              userName={userName}
            />
          ))}
        </ClistContainer>
      </CommentContainer>
    </Container>
  );
};

export default TeamBoard;
