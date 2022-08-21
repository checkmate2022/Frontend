import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { GreyLabel, Loading, PurpleButton } from '../../components';
import { onUserInfoGet } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 13% 0 3% 6%;
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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState('비밀번호');

  const navigate = useNavigate();

  useEffect(() => {
    onUserInfoGet(setUser, setLoading);
  }, []);

  // 수정 페이지로 이동
  const onChange = () => {
    navigate('/mypagechange', { state: { user: user } });
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <LabelContainer>
            <GreyLabel width='70px' text='프로필 사진' />
            <StyledImg src={user.userImage} />
          </LabelContainer>
          <LabelContainer>
            <GreyLabel width='70px' text='닉네임' />
            <StyledInput defaultValue={user.username} disabled />
          </LabelContainer>
          <LabelContainer>
            <GreyLabel width='70px' text='아이디' />
            <StyledInput defaultValue={user.userId} disabled />
          </LabelContainer>
          <LabelContainer>
            <GreyLabel width='70px' text='비밀번호' />
            <StyledInput defaultValue={password} type='password' disabled />
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
        </>
      )}
    </Container>
  );
};

export default Mypage;
