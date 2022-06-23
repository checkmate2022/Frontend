import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { GreyLabel, PurpleButton } from '../../components';
import { onUserInfoGet } from '../../api/auth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 11% 0 3% 6%;
`;

const LabelContainer = styled.div`
  display: flex;
`;

const StyledInput = styled.input`
  background: ${colors.white};
  font-size: 14px;
  margin-left: 35px;
  border: none;
`;

const StyledImg = styled.img`
  width: 90px;
  height: 90px;
  margin-left: 30px;
  border-radius: 10px;
`;

const Mypage = () => {
  const [photo, setPhoto] = useState('');
  const [nickname, setNickName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('비밀번호');

  useEffect(() => {
    onUserInfoGet(setPhoto, setNickName, setId, setPassword);
  }, []);

  // 수정 페이지로 이동
  const onChange = () => {
    window.location.href = '/mypagechange';
  };

  return (
    <Container>
      <LabelContainer>
        <GreyLabel width='70px' text='프로필 사진' />
        <StyledImg src={photo} />
      </LabelContainer>
      <LabelContainer>
        <GreyLabel width='70px' text='닉네임' />
        <StyledInput defaultValue={nickname} />
      </LabelContainer>
      <LabelContainer>
        <GreyLabel width='70px' text='아이디' />
        <StyledInput defaultValue={id} />
      </LabelContainer>
      <LabelContainer>
        <GreyLabel width='70px' text='비밀번호' />
        <StyledInput defaultValue={password} type='password' />
      </LabelContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '10%',
        }}
      >
        <PurpleButton text='수정' onClick={onChange} />
      </div>
    </Container>
  );
};

export default Mypage;
