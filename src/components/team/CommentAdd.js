import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import PurpleButton from '../PurpleButton';
import { BsEmojiSmile, BsXCircle } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import {
  emoticonModalState,
  selectedEmoticonState,
} from '../../store/boardstore';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
`;

const StyledTextArea = styled.textarea`
  width: 90%;
  height: 70px;
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

const StyledImage = styled.img`
  border-radius: 10px;
  width: 38px;
  height: 38px;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 8px;
  width: 5%;
  flex-direction: column;
`;

const EmoticonImg = styled.img`
  width: 100px;
  height: 100px;
  cursor: ${({ type }) => (type === 'edit' ? 'pointer' : 'auto')};
`;

const EmoticonContainer = styled.div`
  position: absolute;
  right: 9%;
  // display: flex;
  // flex-direction: row;
  // justify-content: flex-end;
`;

const SelectedContainer = styled.div`
  margin: 15px 0 0 55px;
`;

function CommentAdd({
  userImage,
  onSubmit,
  content,
  setEmoticonUrl,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoticon, setSelectedEmoticon] = useRecoilState(
    selectedEmoticonState
  );

  const emoticonOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <form onSubmit={onSubmit}>
      <Container>
        <StyledImage src={userImage} />
        <StyledTextArea
          type='text'
          placeholder='내용'
          value={content}
          maxLength={400}
          onChange={onChange}
        />
        <ButtonContainer>
          <PurpleButton text='등록' />
          <div style={{ height: '15px' }} />
          <div>
            <BsEmojiSmile style={iconstyle} onClick={emoticonOpen} />
          </div>
        </ButtonContainer>
      </Container>
      {selectedEmoticon !== '' && (
        <SelectedContainer>
          <EmoticonImg src={selectedEmoticon} />
          <BsXCircle
            style={deleteiconStyle}
            onClick={() => setSelectedEmoticon('')}
          />
        </SelectedContainer>
      )}

      {isOpen && (
        <EmoticonContainer>
          {imgsrc.map((img) => (
            <EmoticonImg
              key={img.id}
              src={img.src}
              type='edit'
              onClick={() => {
                setEmoticonUrl(img.src);
                setSelectedEmoticon(img.src);
                setIsOpen(false);
              }}
            />
          ))}
        </EmoticonContainer>
      )}
    </form>
  );
}

let imgsrc = [
  {
    id: 0,
    src: 'https://checkmatebucket.s3.ap-northeast-2.amazonaws.com/emoticons/angry_melon.png',
  },
  {
    id: 1,
    src: 'https://checkmatebucket.s3.ap-northeast-2.amazonaws.com/emoticons/happy_melon.png',
  },
  {
    id: 2,
    src: 'https://checkmatebucket.s3.ap-northeast-2.amazonaws.com/emoticons/sad_melon.png',
  },
  {
    id: 3,
    src: 'https://checkmatebucket.s3.ap-northeast-2.amazonaws.com/emoticons/wink_melon.png',
  },
];

const iconstyle = {
  cursor: 'pointer',
  width: '30px',
  height: '30px',
};

const deleteiconStyle = {
  cursor: 'pointer',
  width: '15px',
  height: '15px',
  position: 'absolute',
};

export default CommentAdd;
