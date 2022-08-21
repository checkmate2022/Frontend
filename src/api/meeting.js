import { API_BASE_URL } from '../app-config';
import axios from 'axios';

const ACCESS_TOKEN = 'ACCESS_TOKEN';

// 회의 생성
export const onCreateSession = (meetingId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    axios
      .post(
        API_BASE_URL + '/api/v1/session/create-session?meetingId=' + meetingId,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('CREATE SESION', response);
        resolve(response.data.id);
      })
      .catch((response) => {
        var error = Object.assign({}, response);
        if (error?.response?.status === 409) {
          resolve(meetingId);
        } else {
          console.log(error);
          if (
            window.confirm(
              API_BASE_URL +
                '"\n\nClick OK to navigate and accept it. ' +
                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                API_BASE_URL +
                '"'
            )
          ) {
            window.location.assign(API_BASE_URL + '/accept-certificate');
          }
        }
      });
  });
};

// 회의 입장 토큰 생성
export const onCreateToken = (meetingId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    axios
      .post(
        API_BASE_URL + '/api/v1/session/generate-token?meetingId=' + meetingId,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('TOKEN', response);
        resolve(response['data'][0]);
      })
      .catch((error) => reject(error));
  });
};

// 회의 나가기
export const onLeaveSession = (meetingId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    axios
      .post(
        API_BASE_URL + '/api/v1/session/remove-user?meetingId=' + meetingId,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('LeaveSession', response);
      })
      .catch((error) => reject(error));
  });
};
