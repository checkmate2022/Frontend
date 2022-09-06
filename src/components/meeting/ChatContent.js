import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// const LeftContainer = styled.div`
//   border-radius: 20px 20px 20px 0px;
//   margin-left: 0;
//   margin-right: auto;
// `;

const ChatContainer = styled.div`
  background-color: var(--gray800);
  border-radius: 20px 20px 0px 20px;
  padding: 12px;
  margin-bottom: 8px;
  margin-left: auto;
  width: fit-content;
  color: #ffffff;
  font-size: 1rem;
  line-height: 28px;
  border-radius: 20px 20px 20px 0px;
  margin-left: 0;
  margin-right: auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  color: var(--gray300);
  font-size: 0.75rem;
  justify-content: flex-start;
`;

function ChatContent({ chats, user }) {
  const chatRef = useRef();
  const [target, setTarget] = useState();
  const [offset, setOffset] = useState(
    chats.length > 10 ? chats.length - 10 : 0
  );
  const [prevScrollHeight, setPrevScrollHeight] = useState();

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    if (prevScrollHeight && chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight - prevScrollHeight;
      setPrevScrollHeight(null);
    }
  }, [offset]);

  const onIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      setPrevScrollHeight(chatRef.current.scrollHeight);
      setOffset((prev) => (prev - 10 > 0 ? prev - 10 : 0));
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        root: chatRef.current,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <ul ref={chatRef}>
      <div ref={setTarget} />
      {chats.slice(offset).map((item) => (
        <div key={item.id}>
          <li>
            <ChatContainer>{item.content}</ChatContainer>
            <ProfileContainer>
              <>
                <span>{item.userName}</span>
                <span>{item.time}</span>
              </>
            </ProfileContainer>
          </li>
        </div>
      ))}
    </ul>
  );
}

export default ChatContent;
