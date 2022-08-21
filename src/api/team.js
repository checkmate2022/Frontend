import { API_BASE_URL } from '../app-config';

const ACCESS_TOKEN = 'ACCESS_TOKEN';

// 사용자별 팀 조회
export const onTeamAllGet = (setTeamList, setLoading) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + '/api/v1/team/user', {
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
        setLoading(false);
        setTeamList(data);
      }
    });
};

// 팀 등록
export const onTeamAdd = (teamName, teamDescription, participantName) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const Info = {
    teamName: teamName,
    teamDescription: teamDescription,
    participantName: participantName,
  };

  console.log(Info);

  fetch(API_BASE_URL + '/api/v1/team', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify(Info),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        window.location.href = '/team';
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 팀별 사용자 조회
export const onTeamMemberGet = (setMemberList, id) => {
  console.log(id);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + `/api/v1/team/${id}/user`, {
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
        console.log(data);
        setMemberList(data);
      }
    });
};

// 팀 등록을 위한 사용자 정보 조회
// data 값으로 유저를 검색(get)후 반환
export const onUserInfoGet = (setUserList, user) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + `/api/v1/users/search?query=${user}`, {
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
        console.log(data);
        setUserList(data);
      }
    });
};

// 팀 삭제
export const onTeamDelete = (id) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + `/api/v1/team/${id}`, {
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
        alert('삭제 되었습니다.');
        window.location.href = '/team';
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 팀 수정
export const onTeamChange = (
  id,
  teamName,
  teamDescription,
  participantName
) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const Info = {
    teamName: teamName,
    teamDescription: teamDescription,
    participantName: participantName,
  };

  console.log(Info);

  fetch(API_BASE_URL + `/api/v1/team/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify(Info),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        window.location.reload();
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 단건 팀 조회
export const onTeamInfoGet = (id, setTeamName, setTeamDetail) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + `/api/v1/team/${id}`, {
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
        let team = result.data;
        setTeamName(team.teamName);
        setTeamDetail(team.teamDescription);
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

//
