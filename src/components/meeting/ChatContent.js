import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  padding: 12px;
  width: fit-content;
  color: #ffffff;
  font-size: 16px;
  margin: 0 auto 6px 0;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 8px;
  font-size: 13px;
`;

const ChatImg = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 10px;
`;

function ChatContent({ chats, scrollToBottom }) {
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <>
      {chats.map((item, i) => (
        <div key={i}>
          <ProfileContainer>
            <>
              <span>{item.userName}</span>
              <span>{item.time}</span>
            </>
          </ProfileContainer>
          <ChatContainer>
            {item.message}
            {item.img && <ChatImg src={item.img} />}
          </ChatContainer>
        </div>
      ))}
    </>
  );
}

export default ChatContent;
