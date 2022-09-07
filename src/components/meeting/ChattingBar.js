import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Send from '@material-ui/icons/Send';
import { Tooltip } from '@material-ui/core';
import './ChattingBar.css';
import { colors } from '../../styles/theme';
import ChatContent from './ChatContent';

const Container = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 80%;
`;

const ChatComponent = styled.div`
  background-color: #b8b8b8;
  position: absolute;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: calc(100% - 30px);
  width: calc(100% - 30px);
  border-radius: 20px;
`;

const ChatToolbar = styled.div`
  height: 30px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding-top: 4px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  color: #ffffff;
`;

const ChatContainer = styled.div`
  padding: 0 15px;
  height: calc(100% - 80px);
  overflow: auto;
`;

const StyledInput = styled.input`
  width: ${({ typestyle }) => (typestyle === 'date' ? 'fit-content' : '60%')};
  height: 20px;
  opacity: 0.9;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 48px;
  font-size: 14px;
  padding: 12px;
  margin: 0 5px 1% 0;

  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

const ChatImg = styled.img`
  width: 100%;
  height: 100%;
`;

function ChattingBar({ session, streamManager, userName }) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');

  const chatScroll = useRef();
  console.log('streamManager', streamManager);
  console.log('session', session);
  console.log('messageList', messageList);

  useEffect(() => {
    session.on('signal:chat', (event) => {
      const data = JSON.parse(event.data);
      console.log('실행이 왜 안되냐');
      console.log('event.from', event.from);
      console.log('data', data);
      console.log('streamManager', streamManager);
      console.log('connectionId', event.from.connectionId);
      setMessageList((prev) => [...prev, data]);
      // let newmessageList = messageList;
      // newmessageList.push({
      //   // connectionId: data.streamId,
      //   nickname: data.nickname,
      //   message: data.message,
      // });
      // const document = window.document;
      // setTimeout(() => {
      //   const userImg = document.getElementById(
      //     'userImg-' + (newmessageList.length - 1)
      //   );
      //   const video = document.getElementById('video-' + data.streamId);
      //   const avatar = userImg.getContext('2d');
      //   avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
      // }, 50);
      // setMessageList(newmessageList);
      scrollToBottom();
    });
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePressKey = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    console.log(message);
    // if (streamManager && message) {
    //   let newmessage = message.replace(/ +(?= )/g, '');
    //   if (newmessage !== '' && newmessage !== ' ') {
    //     const data = {
    //       message: newmessage,
    //       nickname: userName,
    //       // streamId: streamManager.stream.streamId,
    //     };
    //     session.signal({
    //       data: JSON.stringify(data),
    //       type: 'chat',
    //     });
    //   }
    // }
    // setMessage('');
    const time = new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    session.signal({
      data: JSON.stringify({
        id: `${userName}${Date.now()}`,
        message,
        time,
        userName: userName,
        img: 'https://image.jtbcplus.kr/data/contents/jam_photo/202002/07/3e4bc737-0d46-44c7-a169-95277ea2357c.jpg',
      }),
      type: 'chat',
    });
    setMessage('');
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      try {
        chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  };

  return (
    <Container>
      <ChatComponent>
        <ChatToolbar>
          <span>채팅</span>
        </ChatToolbar>
        <ChatContainer ref={chatScroll}>
          {/* {messageList.map((data, i) => (
            <div key={i} id='remoteUsers'>
              <div className='msg-detail'>
                <div className='msg-info'>
                  <p> {data.nickname}</p>
                </div>
                <div className='msg-content'>
                  <span className='triangle' />
                  <p className='text'>{data.message}</p>
                  <ChatImg src={data.img} />
                </div>
              </div>
            </div>
          ))} */}
          <ChatContent chats={messageList} scrollToBottom={scrollToBottom} />
        </ChatContainer>

        <div id='messageInput'>
          <StyledInput
            placeholder='메세지를 입력하세요'
            id='chatInput'
            value={message}
            onChange={handleChange}
            onKeyPress={handlePressKey}
          />
          <Tooltip title='Send message'>
            <Fab size='small' id='sendButton' onClick={sendMessage}>
              <Send />
            </Fab>
          </Tooltip>
        </div>
      </ChatComponent>
    </Container>
  );
}

export default ChattingBar;
