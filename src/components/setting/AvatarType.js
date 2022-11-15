import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import moment from 'moment';
import { onAvatarDelete } from '../../api/avatar';
import { BsDownload } from 'react-icons/bs';

const Container = styled.div`
  width: 280px;
  height: 320px;
  background: ${({ add }) =>
    add ? colors.avatarcolor[2] : colors.avatarcolor[0]};
  border-radius: 48px;
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`;

const AddButton = styled.button`
  width: 280px;
  height: 320px;
  background: ${colors.avatarcolor[2]};
  opacity: 0.8;
  border-radius: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${colors.avatarcolor[2]};
  }

  &:active {
    box-shadow: ${colors.avatarcolor[2]} 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.5) 0px 18px 36px -18px inset;
  }
`;

const Plustext = styled.span`
  color: ${colors.grey4};
  font-size: 120px;
  font-weight: 400;
`;

const StyledText = styled.span`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 2%;
`;

const NameText = styled.span`
  color: ${colors.white};
  font-size: 25px;
  font-weight: 400;
  margin-left: 5%;
`;

const TextButton = styled.button`
  background: none;
  border: none;
  color: ${colors.white};
  cursor: pointer;
`;

const StyledImg = styled.img`
  height: 100px;
  width: 100px;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  margin: 15% 0 0 8%;
`;

const DetailContainer = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  margin: 7% 0 0 8%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25%;
  margin-right: 4%;
`;

function AvatarType({ avatar, add }) {
  // 아바타 추가 등록
  const onAdd = () => {
    window.location.href = '/avataradd';
  };

  // 아바타 삭제
  const onDelete = (id) => {
    onAvatarDelete(id);
  };

  // 아바타 수정
  const onChange = () => {
    // 수정 페이지로 이동
    window.location.href = '/avataradd';
  };

  // 이미지 다운로드
  const downloadFile = (url) => {
    fetch(url, { method: 'GET' })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '아바타';
        document.body.appendChild(a);
        a.click();
        setTimeout((_) => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
        setOpen(false);
      })
      .catch((err) => {
        console.error('err: ', err);
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex' }}>
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginRight: '30px',
          }}
        >
          {avatar ? <GreyLabel text='기본' /> : <></>}
        </div> */}
        {avatar.map((item) => (
          <Container key={item.avatarSeq}>
            <ImgContainer>
              <StyledImg src={item.avatarCreatedUrl} />
              <NameText>{item.avatarName}</NameText>
            </ImgContainer>
            <DetailContainer>
              <StyledText>
                생성날짜: {moment(item.avatarDate).format('YYYY-MM-DD HH:mm')}
              </StyledText>
              <StyledText>캐릭터 설명: {item.avatarDescription}</StyledText>
            </DetailContainer>
            <ButtonContainer>
              <BsDownload onClick={() => downloadFile(item.avatarCreatedUrl)} />
              <TextButton onClick={() => onDelete(item.avatarSeq)}>
                삭제
              </TextButton>
              <TextButton onClick={onChange}>수정</TextButton>
            </ButtonContainer>
          </Container>
        ))}
      </div>

      {add && (
        <AddButton onClick={onAdd}>
          <Plustext>+</Plustext>
        </AddButton>
      )}
    </div>
  );
}

export default AvatarType;
