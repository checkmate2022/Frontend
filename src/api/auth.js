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
      //console.log(result);
      if (result.success) {
        localStorage.setItem(ACESS_TOKEN, result.data);
        window.location.href = '/';
      } else {
        setError('아이디 또는 비밀번호를 잘못 입력했습니다.');
        return '실패';
      }
    });
};
