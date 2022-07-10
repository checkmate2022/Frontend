import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import moment from 'moment';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 9% 0 3% 15%;
`;

const BoardContainer = styled.div`
  //box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
  width: 90%;
  height: 500px;
  background-color: ${colors.white};
  padding: 40px;
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

const CommentContainer = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-top: 30%;
`;

const TeamBoard = () => {
  const location = useLocation();

  // 게시글 정보
  const item = location.state.item;
  console.log(item);

  return (
    <Container>
      <BoardContainer>
        <h2>{item.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <StyledImage src={item.userImage} />
          <ProfileContainer>
            <NameText>{item.username}</NameText>
            <NameText>
              {moment(item.createDate).format('YYYY/MM/DD  hh:mm')}
            </NameText>
          </ProfileContainer>
        </div>
        <Line />
        <p style={{ padding: '8px' }}>{item.content}</p>
      </BoardContainer>
      {/* <CommentContainer>
        <Line />
        <p>댓글</p>
      </CommentContainer> */}
    </Container>
  );
};

export default TeamBoard;
