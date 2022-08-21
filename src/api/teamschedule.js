import { API_BASE_URL } from '../app-config';

const ACCESS_TOKEN = 'ACCESS_TOKEN';

// 일정 등록
export const onScheduleAdd = (
  scheduleName,
  scheduleDescription,
  scheduleStartDate,
  scheduleEndDate,
  scheduleType,
  participantName,
  teamid
) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const Info = {
    scheduleName: scheduleName,
    scheduleDescription: scheduleDescription,
    scheduleStartDate: scheduleStartDate,
    scheduleEndDate: scheduleEndDate,
    scheduleType: scheduleType,
    participantName: participantName,
    teamId: teamid,
  };

  console.log(Info);

  fetch(API_BASE_URL + '/api/v1/schedule', {
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
      console.log(result);
      if (result.success) {
        window.location.href = `/team/${teamid}/dashboard/`;
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 팀별 일정 조회
export const onTeamScheduleGet = (teamid, setScheduleList) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + `/api/v1/schedule/team/${teamid}`, {
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
        setScheduleList(data);
      }
    });
};

// 일정 수정
export const onScheduleChange = (
  scheduleName,
  scheduleDescription,
  scheduleStartDate,
  scheduleEndDate,
  participantName,
  teamid,
  scheduleId
) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const Info = {
    scheduleName: scheduleName,
    scheduleDescription: scheduleDescription,
    scheduleStartDate: scheduleStartDate,
    scheduleEndDate: scheduleEndDate,
    participantName: participantName,
    teamId: teamid,
  };

  console.log(Info);

  fetch(API_BASE_URL + `/api/v1/schedule/${scheduleId}`, {
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
        window.location.href = `/dashboard/${teamid}/schedulesetting`;
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 일정 삭제
export const onScheduleDelete = (teamid, scheduleId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + `/api/v1/schedule/${scheduleId}`, {
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
        window.location.href = `/team/${teamid}/dashboard/`;
      } else {
        alert('다시 시도해주세요!');
      }
    });
};
