import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { OpenVidu } from 'openvidu-browser';
import UserVideo from '../../components/meeting/UserVideo';
import {
  onCreateSession,
  onCreateToken,
  onLeaveSession,
} from '../../api/meeting';
import { useNavigate, useParams } from 'react-router-dom';
import { ChattingBar, Loading, MeetingBar } from '../../components';
import { mediaState } from '../../store/meetingstore';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/userstore';
import { onUsernameInfoGet } from '../../api/auth';

const ACESS_TOKEN = 'ACESS_TOKEN';
const API_BASE_URL = 'http://localhost:8080';
const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
///const OPENVIDU_SERVER_URL = 'https://52.79.239.28:4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 9% 0 3% 10%;
  width: 80%;
`;

const VideoContainer = styled.div`
  margin-right: 30%;
  margin-top: 5%;
`;

const BarContainer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 63%;
  justify-content: center;
`;

const VideoUl = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  //flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding-left: 0;
  //background-color: red;
`;

const ChattingContainer = styled.div`
  // width: 10%;
  // display: flex;

  position: fixed;
  right: 0;
  width: 25%;
  height: 100%;
`;

const MeetingRoom = () => {
  const { teamId, meetingId } = useParams();

  const navigate = useNavigate();

  // const [OV, setOV] = useState(new OpenVidu());
  const OV = new OpenVidu();
  const [session, setSession] = useState(OV.initSession());

  const [roomName, setRoomName] = useState(meetingId);
  const [userName, setUserName] = useState('');
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [media, setMedia] = useRecoilState(mediaState);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);

  const [count, setCount] = useState(1);

  // 로딩 스피너
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
  }, []);

  const onbeforeunload = (event) => {
    leaveSession();
  };

  useEffect(() => {
    onUsernameInfoGet(setUserName);
    // if (userName !== '') {
    //   joinSession();
    // }
    joinSession();

    console.log('실행되나');
  }, []);

  // useEffect(() => {
  //   connection();
  // }, []);

  console.log('publisher:' + publisher + 'subscribers: ' + subscribers);

  // 카메라 조정
  const onVideoSetting = () => {
    if (media.video) {
      publisher.publishVideo(false);
      setMedia((prev) => ({ ...prev, video: false }));
    } else {
      publisher.publishVideo(true);
      setMedia((prev) => ({ ...prev, video: true }));
    }
    // publisher.streamManager.publishVideo(
    //   !publisher.streamManager.stream.videoActive
    // );
    // setMedia((prev) => ({ ...prev, video: !prev.video }));
  };

  // 마이크 조정
  const onMicSetting = () => {
    if (media.mic) {
      publisher.publishAudio(false);
      setMedia((prev) => ({ ...prev, mic: false }));
    } else {
      publisher.publishAudio(true);
      setMedia((prev) => ({ ...prev, mic: true }));
    }
    // publisher.streamManager.publishAudio(
    //   !publisher.streamManager.stream.audioActive
    // );
    // // session.signal({ data: JSON.stringify({ isMicOn: !media.mic }), type: "micStatusChanged" });
    // // setPublisher({ ...publisher, isMicOn: !publisher.isMicOn });
    // setMedia((prev) => ({ ...prev, mic: !prev.mic }));
  };

  // const createSession = (meetingId) => {
  //   const accessToken = localStorage.getItem(ACESS_TOKEN);

  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post(
  //         API_BASE_URL +
  //           '/api/v1/session/create-session?meetingId=' +
  //           meetingId,
  //         {},
  //         {
  //           headers: {
  //             Authorization: 'Bearer ' + accessToken,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log('CREATE SESION', response);
  //         resolve(meetingId);
  //       })
  //       .catch((response) => {
  //         var error = Object.assign({}, response);
  //         if (error?.response?.status === 409) {
  //           resolve(meetingId);
  //         } else {
  //           console.log(error);
  //           if (
  //             window.confirm(
  //               API_BASE_URL +
  //                 '"\n\nClick OK to navigate and accept it. ' +
  //                 'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
  //                 API_BASE_URL +
  //                 '"'
  //             )
  //           ) {
  //             window.location.assign(API_BASE_URL + '/accept-certificate');
  //           }
  //         }
  //       });
  //   });
  // };

  // const createToken = (meetingId) => {
  //   const accessToken = localStorage.getItem(ACESS_TOKEN);

  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post(
  //         API_BASE_URL +
  //           '/api/v1/session/generate-token?meetingId=' +
  //           meetingId,
  //         {},
  //         {
  //           headers: {
  //             Authorization: 'Bearer ' + accessToken,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log('TOKEN', response);
  //         resolve(response['data'][0]);
  //         setLoading(false);
  //       })
  //       .catch((error) => reject(error));
  //   });
  // };

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + '/accept-certificate'
              );
            }
          }
        });
    });
  };

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  const getToken = async () => {
    return createSession(meetingId).then((meetingId) => createToken(meetingId));
  };

  // 회의 참가
  const joinSession = async () => {
    const devices = await OV.getDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === 'videoinput'
    );
    console.log(videoDevices);

    getToken().then((token) => {
      session
        .connect(token, { userName: userName })
        .then(async () => {
          // OV.getUserMedia({}).then(() => {
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined,
            // videoSource: videoTrack,
            videoSource: videoDevices[1].deviceId,
            publishAudio: media.mic,
            publishVideo: media.video,
            insertMode: 'APPEND',
            mirror: false,
            resolution: '1280x720',
            frameRate: 10,
          });

          publisher.once('accessAllowed', () => {
            session.publish(publisher);
            setPublisher(publisher);
            //setMainStreamManager(publisher);
          });
          setCurrentVideoDevice(videoDevices[1]);
          setLoading(false);

          // });
        })
        .catch((error) => {
          console.warn(
            'There was an error connecting to the session:',
            error.code,
            error.message
          );
        });
    });
    connection();
  };

  const connection = () => {
    // 스트림 생성
    session.on('streamCreated', (event) => {
      const newSubscriber = session.subscribe(event.stream, undefined);
      const newSubscribers = subscribers;

      console.log('체크', event.stream);
      newSubscribers.push(newSubscriber);

      setSubscribers([...subscribers]);

      setCount((prev) => prev + 1);
    });

    // 스트림 삭제
    session.on('streamDestroyed', (event) => {
      //event.preventDefault();
      deleteSubscriber(event.stream.streamManager);
      setCount((prev) => prev - 1);
    });

    session.on('exception', (exception) => {
      console.warn(exception);
    });
  };

  const deleteSubscriber = (event) => {
    // let newsubscribers = subscribers;
    // let index = newsubscribers.indexOf(streamManager, 0);
    // if (index > -1) {
    //   newsubscribers.splice(index, 1);
    //   setSubscribers(newsubscribers);
    // }
    setSubscribers((prev) =>
      prev.filter(
        (user) => user.connectionId !== event.stream.connection.connectionId
      )
    );
  };

  // 회의 종료
  const leaveSession = () => {
    //const mySession = session;
    if (session) {
      session.disconnect();
    }
    onLeaveSession(meetingId);
    resetRoomInfo();
    navigate(`/team/${teamId}/dashboard`);
    //window.location.href = `/team/${teamId}/dashboard`;
  };

  // 모든 요소 종료
  const resetRoomInfo = () => {
    // setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setRoomName('');
    setPublisher(undefined);
  };

  // 화면 전환
  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );
        console.log(newVideoDevice);

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: media.mic,
            publishVideo: media.video,
            mirror: false,
          });

          //newPublisher.once("accessAllowed", () => {
          await session.unpublish(publisher);
          await session.publish(newPublisher);
          setPublisher(newPublisher);
          setCurrentVideoDevice(newVideoDevice[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      {loading ? <Loading /> : null}
      <VideoContainer>
        <VideoUl>
          {publisher !== undefined ? (
            <UserVideo streamManager={publisher} count={count} />
          ) : null}
          {subscribers.map((sub, i) => (
            <UserVideo key={i} streamManager={sub} count={count} />
          ))}
        </VideoUl>
      </VideoContainer>
      <ChattingContainer>
        <ChattingBar
          session={session}
          userName={userName}
          streamManager={publisher}
        />
      </ChattingContainer>

      <BarContainer>
        <MeetingBar
          isVideo={media.video}
          isMic={media.mic}
          onVideoSetting={onVideoSetting}
          onMicSetting={onMicSetting}
          leaveSession={leaveSession}
          switchCamera={switchCamera}
        />
      </BarContainer>
    </Container>
  );
};

export default MeetingRoom;
