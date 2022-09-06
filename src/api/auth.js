import { API_BASE_URL } from '../app-config';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

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
        localStorage.setItem(ACCESS_TOKEN, result.data);
        window.location.href = '/main';
        onLoginSuccess(result.data);
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
      if (result.success) {
        if (result.data === 1) {
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
        window.location.href = '/';
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 사용자 정보 가져오기
export const onUserInfoGet = (setUser, setLoading) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + '/api/v1/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        const data = result.data;
        // setPhoto(data.userImage);
        // setNickName(data.username);
        setUser(data);
        setLoading(false);
      }
    });
};

// 사용자 수정
export const onChangeUser = (username, password) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(
    API_BASE_URL + `/api/v1/users?username=${username}&password=${password}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }
  )
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        // 새로고침
        window.location.reload();
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 로그아웃
export const onLogout = () => {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = '/';
};

// 탈퇴
export const onDeleteUser = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + '/api/v1/users', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        alert('탈퇴 되었습니다!');
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 사용자 이름 가져오기(게시글, 댓글 작성자 비교)
export const onUsernameInfoGet = (setUserName) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + '/api/v1/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        const data = result.data;
        setUserName(data.username);
      }
    });
};

// 사용자 아이디 가져오기(팀장 확인)
export const onUserIdInfoGet = (setUserId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + '/api/v1/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        const data = result.data;
        setUserId(data.userId);
      }
    });
};

// 토큰 refresh
export const onTokenRefresh = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + '/api/v1/auth/refresh', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        const data = result.data;
        onLoginSuccess(result.data);
        return data.userId;
      }
    });
};

export const onLoginSuccess = (accessToken) => {
  // accessToken 설정
  localStorage.setItem(ACCESS_TOKEN, accessToken);

  // accessToken 만료하기 1분 전에 로그인 연장
  setTimeout(onTokenRefresh, JWT_EXPIRY_TIME - 60000);
};
