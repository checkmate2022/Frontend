import { API_BASE_URL } from '../app-config';

const ACCESS_TOKEN = 'ACCESS_TOKEN';

// 아바타 이름 중복확인
export const onAvatarNameCheck = (name, setAvatarName) => {};

// 아바타 등록
export const avatarAddapi = (avatarInfo, imgfile, createdfile) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  var formData = new FormData();

  console.log(createdfile);

  formData.append('originfile', imgfile);
  formData.append('createdfile', createdfile);
  formData.append('avatarName', avatarInfo.avatarName);
  formData.append('avatarDescription', avatarInfo.avatarDescription);
  formData.append('avatarStyle', avatarInfo.avatarStyle);
  formData.append('avatarStyleId', avatarInfo.avatarStyleId);

  console.log(formData);

  fetch(API_BASE_URL + '/api/v1/avatar', {
    method: 'POST',
    headers: {
      //'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.success) {
        window.location.href = '/avatarsetting';
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 아바타 변환
export const avatarChangeApi = (
  file,
  setCreatedfile,
  avatarInfo,
  setCreatedPreview,
  setLoading
) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  var formData = new FormData();

  formData.append('file', file);
  formData.append('style', avatarInfo.style);
  formData.append('id', avatarInfo.id);
  formData.append('name', avatarInfo.name);
  console.log(formData);
  setLoading(true);
  fetch('http://127.0.0.1:5000/aa', {
    method: 'POST',
    headers: {
      //'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: formData,
  })
    .then((res) => {
      if (res.status === 200) {
        return res.blob();
      } else {
        alert('다른 사진을 첨부해주세요!');
        setLoading(false);
      }
    })
    .then((result) => {
      console.log('result:', result);
      var image = window.URL.createObjectURL(result);
      console.log(image);
      const file = new File([result], 'image.png', { type: 'image/png' });
      console.log(file);
      setCreatedfile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          // 미리보기 사진
          setCreatedPreview(reader.result);
          resolve();
          setLoading(false);
        };
      });
    });
};

// 전체 아바타 조회
export const onAvatarAllGet = (setAvatarList) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  fetch(API_BASE_URL + '/api/v1/avatar', {
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
        const data = result.list;
        setAvatarList(data);
        console.log(data);
      }
    });
};

// 아바타 삭제
export const onAvatarDelete = (id) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + '/api/v1/avatar/' + parseInt(id), {
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
        alert('아바타가 삭제되었습니다.');
        window.location.reload();
      } else {
        alert('다시 시도해주세요.');
      }
    });
};

// 이모티콘 변환
export const emoticonAdd = (file, setEmoticonList, setIsEmoticonLoading) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  setIsEmoticonLoading(true);
  var formData = new FormData();
  formData.append('file', file);
  console.log(formData);
  fetch('http://127.0.0.1:5001/anime', {
    method: 'POST',
    headers: {
      //'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      if (result) {
        setIsEmoticonLoading(false);
        setEmoticonList(result);
      }
    });
};

// 이모티콘 불러오기
export const onEmoticonGet = (setEmoticonList) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  fetch(API_BASE_URL + '/api/v1/avatar/basic/emoticons' + parseInt(id), {
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
        setEmoticonList(result.list);
      }
    });
};
