import { API_BASE_URL } from '../app-config';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const AVATAR_API = 'http://172.20.73.191:';

// 아바타 이름 중복확인
export const onAvatarNameCheck = (name, setAvatarName) => {};

// 아바타 등록
export const avatarAddapi = (
  avatarInfo,
  imgfile,
  createdfile,
  emoticonList
) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  var formData = new FormData();

  console.log(createdfile);

  formData.append('originfile', imgfile);
  formData.append('createdfile', createdfile);
  formData.append('avatarName', avatarInfo.avatarName);
  formData.append('avatarDescription', avatarInfo.avatarDescription);
  formData.append('avatarStyle', avatarInfo.avatarStyle);
  formData.append('avatarStyleId', avatarInfo.avatarStyleId);
  // 이모티콘
  formData.append('sadEmoticon', emoticonList.sad);
  formData.append('happyEmoticon', emoticonList.happy);
  formData.append('winkEmoticon', emoticonList.wink);
  formData.append('angryEmoticon', emoticonList.angry);
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
        onAvatarBasic(result.data.avatarSeq);
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 아바타 기본 설정
export const onAvatarBasic = (avatarId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  fetch(API_BASE_URL + `/api/v1/avatar/isBasic/${avatarId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then((res) => res.json())
    .then((result) => {});
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
  fetch(AVATAR_API + '5000/aa', {
    method: 'POST',
    headers: {
      //'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: formData,
  })
    // .then(setTimeout(() => setLoading(false), 30000))
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
export const emoticonAdd = (
  avatarName,
  file,
  setEmoticonList,
  setIsEmoticonLoading
) => {
  console.log(file, setEmoticonList);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  setIsEmoticonLoading(true);
  var formData = new FormData();
  formData.append('name', avatarName);
  formData.append('file', file);
  console.log(formData);
  fetch(AVATAR_API + '5001/anime', {
    method: 'POST',
    headers: {
      //'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: formData,
  })
    // .then(setTimeout(() => setIsEmoticonLoading(false), 30000))
    .then((res) => res.json())
    .then((result) => {
      setIsEmoticonLoading(false);
      if (result) {
        setEmoticonList(result[0]);
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 이모티콘 불러오기
export const onEmoticonGet = (setEmoticonList) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  fetch(API_BASE_URL + '/api/v1/avatar/basic/emoticons', {
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
        console.log(result);
        setEmoticonList(result.list);
      }
    });
};
