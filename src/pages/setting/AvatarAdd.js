import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import {
  GreyButton,
  AvatarButton,
  WebcamModal,
  PhotoUploader,
  PurpleButton,
  GreyLabel,
} from '../../components';
import { avatarAddapi, avatarChangeApi } from '../../api/avatar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 11% 0 3% 6%;
`;

const LabelContainer = styled.div`
  display: flex;
  width: fit-content;
`;

const StyledInput = styled.input`
  width: ${({ width }) => (width === 'disabled' ? 290 : 100)}px;
  height: 6px;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 48px;
  font-size: 14px;
  padding: 12px;
  margin-right: 5px;

  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

const StyledTextArea = styled.textarea`
  width: 500px;
  height: 55px;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 20px;
  font-size: 14px;
  padding: 1.3%;
  resize: none;
  overflow: hidden;
  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

const ImgContainer = styled.div`
  overflow: hidden;
  width: 184px;
  height: 224px;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 15px;
  margin-bottom: 3%;
`;

const AvatarAdd = () => {
  // 서버로 보낼 데이터
  const [imgfile, setImgfile] = useState(null);
  const [avatarName, setAvatarName] = useState('');
  const [detail, setDetail] = useState('');
  const [avatarStyle, setAvatarStyle] = useState('');
  const [styleNum, SetStyleNum] = useState('');

  // 변환된 사진 & 사진 미리보기
  const [createdfile, setCreatedfile] = useState(null);
  const [createdPreview, setCreatedPreview] = useState(null);

  // 라디오 버튼
  const avatarStyles = ['cartoon', 'caricature', 'anime', 'arcane', 'pixar'];
  const onClickRadioButton = (e) => {
    setAvatarStyle(e.target.value);
  };

  // 화면 캡쳐 & 사진 미리보기
  const [imgSrc, setImgSrc] = useState(null);
  const [imgName, setImgName] = useState('');

  // 사진 삭제
  const onDeleteImg = () => {
    setImgName('');
    setImgSrc(null);
    setImgfile('');
  };

  // 아바타 이름 중복확인
  const onCheckName = () => {};

  // 아바타 변형(flask)
  const onAvatarChange = () => {
    avatarChangeApi(
      imgfile,
      setCreatedfile,
      {
        id: parseInt(styleNum),
        style: avatarStyle,
        name: avatarName,
      },
      setCreatedPreview
    );
  };

  // 아바타 등록
  const onAvatarAdd = () => {
    avatarAddapi(
      {
        avatarName: avatarName,
        avatarDescription: detail,
        avatarStyle: avatarStyle,
        avatarStyleId: parseInt(styleNum),
      },
      imgfile,
      createdfile
    );
  };

  console.log(createdfile);

  return (
    <Container>
      <div style={{ display: 'flex' }}>
        <div>
          <GreyLabel text='사진 업로드' />
          <LabelContainer>
            <StyledInput disabled={true} value={imgName} width={'disabled'} />
            <PhotoUploader
              setImgfile={setImgfile}
              setImgSrc={setImgSrc}
              setImgName={setImgName}
            />
          </LabelContainer>
          <WebcamModal setImgSrc={setImgSrc} setImgfile={setImgfile} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginLeft: '8%',
          }}
        >
          <ImgContainer>
            {imgSrc && (
              <img style={{ width: '184px', height: '224px' }} src={imgSrc} />
            )}
          </ImgContainer>
          <GreyButton
            text='삭제'
            type='button'
            onClick={onDeleteImg}
            width='40px'
            height='32px'
          />
        </div>
      </div>
      <GreyLabel text='아바타 이름' />
      <LabelContainer>
        <StyledInput
          name='avatarName'
          value={avatarName}
          onChange={(e) => setAvatarName(e.target.value)}
        />
        {/* <GreyButton
          text='중복확인'
          type='button'
          onClick={onCheckName}
          width='fit-content'
          height='auto'
        /> */}
      </LabelContainer>
      <GreyLabel text='아바타 설명' />
      <StyledTextArea
        type='text'
        value={detail}
        maxLength={300}
        onChange={(e) => setDetail(e.target.value)}
      />
      <GreyLabel text='아바타 스타일' />
      <AvatarButton
        datas={avatarStyles}
        checkedvalue={avatarStyle}
        onChange={onClickRadioButton}
      />
      <GreyLabel text='아바타 스타일 번호' />
      <StyledInput
        name='avatarName'
        value={styleNum}
        onChange={(e) => SetStyleNum(e.target.value)}
      />

      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <GreyButton
          text='아바타로 변형하기'
          type='button'
          onClick={() => onAvatarChange()}
          width='400px'
          height='40px'
        />
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}
      >
        <img src={createdPreview} style={{ width: '25%', height: '25%' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PurpleButton text='완료' onClick={onAvatarAdd} />
      </div>
      <img alt='cartoon' src='images/cartoon_style.png' />
      <img alt='caricature' src='images/caricature_style.png' />
      <img alt='anime' src='images/anime_style.png' />
    </Container>
  );
};

export default AvatarAdd;
