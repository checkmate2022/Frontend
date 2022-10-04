import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Send from '@material-ui/icons/Send';
import { Tooltip } from '@material-ui/core';
import './ChattingBar.css';
import { colors } from '../../styles/theme';
import ChatContent from './ChatContent';
import { BsEmojiSmile } from 'react-icons/bs';

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

const EmoticonsContainer = styled.div`
  position: absolute;
  right: 120px;
  width: 100%;
  height: 100%;
  top: 0px;
  background-color: ${colors.white};
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

const EmoticonImg = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
  border-radius: 10px;
`;

const EmoticonContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 0px;
  margin: auto;
  box-shadow: none !important;
`;

function ChattingBar({ session, streamManager, userName }) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');

  const chatScroll = useRef();
  console.log('streamManager', streamManager);
  //console.log('streamManager.session', streamManager.session);
  console.log('session', session);
  console.log('messageList', messageList);

  const [isOpen, setIsOpen] = useState(false);

  const emoticonOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (streamManager) {
      streamManager.session.on('signal:chat', (event) => {
        const data = JSON.parse(event.data);

        setMessageList((prev) => [...prev, data]);

        // let newmessageList = messageList;
        // newmessageList.push(data);
        // setMessageList(newmessageList);
        // scrollToBottom();
      });
    }
  }, [streamManager]);

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
        message: message,
        time: time,
        userName: userName,
      }),
      type: 'chat',
    });
    setMessage('');
  };

  // 이모티콘 보내기
  const sendEmoticon = (src) => {
    console.log(message);
    const time = new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    session.signal({
      data: JSON.stringify({
        id: `${userName}${Date.now()}`,
        message: '',
        time,
        userName: userName,
        img: src,
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
          <ChatContent chats={messageList} scrollToBottom={scrollToBottom} />
        </ChatContainer>
        <EmoticonContainer>
          <div>
            <IconContainer>
              <BsEmojiSmile style={iconstyle} onClick={emoticonOpen} />
            </IconContainer>
            {isOpen && (
              <EmoticonsContainer>
                {imgsrc.map((img) => (
                  <EmoticonImg
                    key={img.id}
                    src={img.src}
                    onClick={() => sendEmoticon(img.src)}
                  />
                ))}
              </EmoticonsContainer>
            )}
          </div>
        </EmoticonContainer>
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

let imgsrc = [
  {
    id: 0,
    src: 'https://checkmatebucket.s3.ap-northeast-2.amazonaws.com/emoticons/angry.png',
  },
  {
    id: 1,
    src: 'https://checkmatebucket.s3.ap-northeast-2.amazonaws.com/emoticons/happy.png',
  },
  {
    id: 2,
    src: 'https://checkmatebucket.s3.ap-northeast-2.amazonaws.com/emoticons/sad.png',
  },
  {
    id: 3,
    src: 'https://checkmatebucket.s3.ap-northeast-2.amazonaws.com/emoticons/wink.png',
  },
];

const iconstyle = {
  cursor: 'pointer',
  width: '30px',
  height: '30px',
};

export default ChattingBar;
