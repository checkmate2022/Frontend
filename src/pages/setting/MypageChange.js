import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { GreyLabel, Loading, PurpleButton } from '../../components';
import {
  onChangeUser,
  onIdDoubleCheck,
  onNickNameDoubleCheck,
} from '../../api/auth';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

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

const StyledEditInput = styled.input`
  width: 190px;
  height: 6px;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 48px;
  font-size: 14px;
  padding: 12px;
  margin: 7px 5px 0 25px;

  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: ${colors.red};
  font-weight: 300;
  margin: 2% 5px 0 30px;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Mypage = () => {
  const location = useLocation();
  const user = location.state.user;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState([]);
  // const [password, setPassword] = useState('비밀번호');

  const { state } = useLocation();

  const [idCheck, setIdCheck] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);

  // blur
  const [idblur, setIdBlur] = useState(true);
  const [nicknameblur, setNicknameBlur] = useState(true);

  // 아이디, 비밀번호, 닉네임
  const { password, nickname } = watch();

  // 중복확인 오류 메세지(동기)
  const [idError, setIdError] = useState('');
  const [nickError, setNickError] = useState('');

  // 닉네임 중복확인
  const onCheckNickname = () => {
    // 빈칸이거나 이전 닉네임이랑 다를 시 중복 확인
    if (nickname !== '' && nickname !== state.user.username) {
      onNickNameDoubleCheck(nickname, setNicknameCheck, setNickError);
    }
  };

  const onChangeButton = () => {
    onChangeUser(nickname, password);
    window.location.href('/mypage');
  };

  // useEffect(() => {
  //   onUserInfoGet(setUser, setLoading);
  // }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={handleSubmit(onChangeButton)}>
            <LabelContainer>
              <GreyLabel width='70px' text='프로필 사진' />
              <StyledImg src='{user.userImage}' />
            </LabelContainer>
            <LabelContainer>
              <GreyLabel width='70px' text='닉네임' />
              <ColumnContainer>
                <StyledEditInput
                  {...register('nickname', {
                    required: true,
                    validate: () => nicknameCheck === true,
                    onBlur: () => {
                      onCheckNickname();
                      setNicknameBlur(true);
                    },
                  })}
                  onFocus={() => {
                    setNicknameBlur(false);
                    setNickError('');
                  }}
                />
                {errors.nickname?.type === 'required' && (
                  <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage>
                )}
                {errors.nickname?.type === 'validate' && nicknameblur && (
                  <ErrorMessage>{nickError}</ErrorMessage>
                )}
                {!errors.nickname &&
                  !nicknameCheck &&
                  nicknameblur &&
                  nickname !== undefined &&
                  nickname !== '' && <ErrorMessage>{nickError}</ErrorMessage>}
              </ColumnContainer>
            </LabelContainer>

            <LabelContainer>
              <GreyLabel width='70px' text='아이디' />
              <StyledInput defaultValue={user.userId} disabled />
            </LabelContainer>
            <LabelContainer>
              <GreyLabel width='70px' text='비밀번호' />
              <ColumnContainer>
                <StyledEditInput
                  type='password'
                  {...register('password', { required: true })}
                />
                {errors.password?.type === 'required' && (
                  <ErrorMessage>비밀번호를 입력해주세요.</ErrorMessage>
                )}
              </ColumnContainer>
            </LabelContainer>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '10%',
              }}
            >
              <PurpleButton text='확인' />
            </div>
          </form>
        </>
      )}
    </Container>
  );
};

export default Mypage;
