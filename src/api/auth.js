import { API_BASE_URL } from '../app-config';

const ACESS_TOKEN = 'ACESS_TOKEN';

// 로그인
export const loginApi = (id, password, setError) => {
  const Info = {
    id: id,
    password: password,
  };

  fetch(API_BASE_URL + '/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(Info),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        localStorage.setItem(ACESS_TOKEN, result.data);
        window.location.href = '/';
      } else {
        setError('아이디 또는 비밀번호를 잘못 입력했습니다.');
      }
    });
};

// 아이디 중복확인
export const onIdDoubleCheck = (id, setIdCheck, setIdError) => {
  fetch(API_BASE_URL + '/api/v1/users/check/userId?userId=' + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log('아이디 중복확인');
      if (result.success) {
        if (result.data === 1) {
          // 중복된 아이디
          setIdError('이미 사용된 아이디입니다.');
          setIdCheck(false);
        } else if (result.data === 0) {
          // 사용 가능한 아이디
          setIdCheck(true);
        }
      }
    });
};

// 닉네임 중복확인
export const onNickNameDoubleCheck = (
  nickname,
  setNicknameCheck,
  setNickError
) => {
  fetch(API_BASE_URL + '/api/v1/users/check/name?username=' + nickname, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log('닉네임 중복확인');
      if (result.success) {
        if (result.data === 2) {
          // 중복
          setNickError('이미 사용된 닉네임입니다.');
          setNicknameCheck(false);
        } else if (result.data === 0) {
          // 사용 가능
          setNicknameCheck(true);
        }
      }
    });
};

// 회원가입
export const signupApi = (id, password, nickname) => {
  const Info = {
    userId: id,
    username: nickname,
    password: password,
  };

  fetch(API_BASE_URL + '/api/v1/users/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(Info),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        window.location.href = '/login';
      } else {
        alert('다시 시도해주세요!');
      }
    });
};
