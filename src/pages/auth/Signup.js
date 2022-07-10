import React, { useState } from 'react';
import styled from 'styled-components';
import AuthButton from '../../components/auth/AuthButton';
import { colors } from '../../styles/theme';
import { useForm } from 'react-hook-form';
import GreyLabel from '../../components/GreyLabel';
import {
  onIdDoubleCheck,
  onNickNameDoubleCheck,
  signupApi,
} from '../../api/auth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 6% 0 0 0;
`;

const LabelContainer = styled.div`
  display: flex;
`;

const StyledInput = styled.input`
  width: 290px;
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

const ErrorMessage = styled.p`
  font-size: 12px;
  color: ${colors.red};
  font-weight: 300;
  margin: 2% 0 0 2%;
`;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [idCheck, setIdCheck] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);

  // blur
  const [idblur, setIdBlur] = useState(true);
  const [nicknameblur, setNicknameBlur] = useState(true);

  // 아이디, 비밀번호, 닉네임
  const { id, password, nickname } = watch();

  // 중복확인 오류 메세지(동기)
  const [idError, setIdError] = useState('');
  const [nickError, setNickError] = useState('');

  // 회원가입 전송
  const onSubmit = () => {
    signupApi(id, password, nickname);
  };

  // 아이디 중복확인
  const onCheckId = () => {
    if (id !== '') {
      onIdDoubleCheck(id, setIdCheck, setIdError);
    }
  };

  // 닉네임 중복확인
  const onCheckNickname = () => {
    if (nickname !== '') {
      onNickNameDoubleCheck(nickname, setNicknameCheck, setNickError);
    }
  };

  return (
    <Container>
      <h1 style={{ fontWeight: 600, fontSize: '45px' }}>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GreyLabel text='아이디' />
        <LabelContainer>
          <StyledInput
            {...register('id', {
              required: true,
              validate: () => idCheck === true,
              onBlur: () => {
                onCheckId();
                setIdBlur(true);
              },
            })}
            onFocus={() => {
              setIdBlur(false);
              setIdError('');
            }}
          />
        </LabelContainer>
        {errors.id?.type === 'required' && (
          <ErrorMessage>아이디를 입력해주세요.</ErrorMessage>
        )}
        {errors.id?.type === 'validate' && idblur && (
          <ErrorMessage>{idError}</ErrorMessage>
        )}
        {!errors.id && idblur && id !== '' && id !== undefined && !idCheck && (
          <ErrorMessage>{idError}</ErrorMessage>
        )}
        <GreyLabel text='비밀번호' />
        <StyledInput
          type='password'
          {...register('password', { required: true })}
        />
        {errors.password?.type === 'required' && (
          <ErrorMessage>비밀번호를 입력해주세요.</ErrorMessage>
        )}
        <GreyLabel text='비밀번호 확인' />
        <StyledInput
          type='password'
          {...register('checkpw', {
            required: true,
            validate: (value) => value === watch().password,
          })}
        />
        {errors.checkpw?.type === 'required' && (
          <ErrorMessage>비밀번호를 한번 더 입력해주세요.</ErrorMessage>
        )}
        {errors.checkpw?.type === 'validate' && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}
        <GreyLabel text='닉네임' />
        <LabelContainer>
          <StyledInput
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
        </LabelContainer>
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

        <AuthButton text='회원가입' />
      </form>
    </Container>
  );
};

export default Signup;
