import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import moment from 'moment';
import {
  onCommentChange,
  onCommentDelete,
  onCommentGet,
} from '../../api/teamboard';
import { useRecoilState, useRecoilValue } from 'recoil';
import { commentState } from '../../store/boardstore';
import CommentAdd from './CommentAdd';

const NameText = styled.span`
  font-size: ${({ size }) => (size ? size : 14)}px;
  margin-left: ${({ bottom }) => (bottom ? bottom : 15)}px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: fit-content;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledImage = styled.img`
  border-radius: 10px;
  width: 38px;
  height: 38px;
`;

const Line = styled.hr`
  width: 100%;
  height: 0px;
  border: 0.5px solid ${colors.grey3};
  margin: 10px 0 20px 0;
`;

const EditContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const EditText = styled.span`
  font-size: 12px;
  cursor: pointer;
  opacity: 0.8;
  margin-left: 8px;
`;

const EmoticonImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
`;

function CommentList({ comment, boardId, onEdit, isEdit, resetIdx, userName }) {
  const [commentList, setCommentList] = useRecoilState(commentState);
  const [content, setContent] = useState(comment.content);
  const [emoticonUrl, setEmoticonUrl] = useState('');

  // 댓글 수정
  const onCommentEditButton = (event) => {
    event.preventDefault();
    onCommentChange(comment.commentSeq, content).then((result) => {
      if (result) {
        onCommentGet(boardId).then((res) => setCommentList(res));
        resetIdx();
      }
    });
  };

  // 댓글 삭제
  const onCommentDeleteButton = (commentId) => {
    onCommentDelete(commentId).then((result) => {
      if (result) {
        onCommentGet(boardId).then((res) => setCommentList(res));
      }
    });
  };
  return (
    <div>
      {isEdit ? (
        <>
          <CommentAdd
            onSubmit={onCommentEditButton}
            userImage={comment.userImage}
            content={content}
            onChange={(e) => setContent(e.target.value)}
            setEmoticonUrl={setEmoticonUrl}
          />
          <EditContainer>
            <EditText onClick={resetIdx}>취소</EditText>
          </EditContainer>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <StyledImage src={comment.userImage} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ProfileContainer>
                <NameText>{comment.username}</NameText>
                <NameText size={11} bottom={5}>
                  {moment(comment.modifiedDate).format('YYYY/MM/DD  HH:mm')}
                </NameText>
              </ProfileContainer>
              <NameText size={15}>{comment.content}</NameText>
              {comment.emoticon !== '' && (
                <EmoticonImg src={comment.emoticon} />
              )}
            </div>
          </div>
          {userName === comment.username ? (
            <EditContainer>
              <EditText onClick={onEdit}>수정</EditText>
              <EditText
                onClick={() => onCommentDeleteButton(comment.commentSeq)}
              >
                삭제
              </EditText>
            </EditContainer>
          ) : null}
        </>
      )}
      <Line />
    </div>
  );
}

export default CommentList;
