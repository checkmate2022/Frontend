import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { OpenVidu } from 'openvidu-browser';
import UserVideo from '../../components/meeting/UserVideo';
import { onCreateSession, onCreateToken } from '../../api/meeting';
import { useParams } from 'react-router-dom';
import { Loading, MeetingBar } from '../../components';
import { mediaState } from '../../store/meetingcounter';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/counter';

const ACESS_TOKEN = 'ACESS_TOKEN';
const API_BASE_URL = 'http://localhost:8080';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 9% 0 3% 10%;
  width: 80%;
`;

const VideoContainer = styled.div``;

const BarContainer = styled.div`
  display: flex;
  margin-top: 3%;
  width: 63%;
  justify-content: flex-end;
`;

const VideoUl = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

const MeetingRoom = () => {
  const { teamId, meetingId } = useParams();

  const userInfo = useRecoilState(userState);

  const [roomName, setRoomName] = useState('SessionA');
  const [userName, setUserName] = useState(userInfo.userName);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [media, setMedia] = useRecoilState(mediaState);

  const [count, setCount] = useState(1);

  const [OV, setOV] = useState(undefined);

  // 로딩 스피너
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
  }, []);

  const onbeforeunload = (event) => {
    leaveSession();
  };

  useEffect(() => {
    if (session === undefined) {
      joinSession();
      console.log('joinsession');
    }
    //joinSession();
    console.log('실행되나');
  }, []);

  console.log('publisher:' + publisher + 'subscribers: ' + subscribers);

  // 카메라 조정
  const onVideoSetting = () => {
    publisher.streamManager.publishVideo(
      !publisher.streamManager.stream.videoActive
    );
    setMedia((prev) => ({ ...prev, video: !prev.video }));
  };

  // 마이크 조정
  const onMicSetting = () => {
    publisher.streamManager.publishAudio(
      !publisher.streamManager.stream.audioActive
    );
    // session.signal({ data: JSON.stringify({ isMicOn: !media.mic }), type: "micStatusChanged" });
    // setPublisher({ ...publisher, isMicOn: !publisher.isMicOn });
    setMedia((prev) => ({ ...prev, mic: !prev.mic }));
  };

  const createSession = (meetingId) => {
    const accessToken = localStorage.getItem(ACESS_TOKEN);

    return new Promise((resolve, reject) => {
      axios
        .post(
          API_BASE_URL +
            '/api/v1/session/create-session?meetingId=' +
            meetingId,
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
          resolve(meetingId);
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

  const createToken = (meetingId) => {
    const accessToken = localStorage.getItem(ACESS_TOKEN);

    return new Promise((resolve, reject) => {
      axios
        .post(
          API_BASE_URL +
            '/api/v1/session/generate-token?meetingId=' +
            meetingId,
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
          setLoading(false);
        })
        .catch((error) => reject(error));
    });
  };

  const getToken = () => {
    return createSession(meetingId).then((meetingId) => createToken(meetingId));
  };

  // 회의 참가
  const joinSession = () => {
    const newOV = new OpenVidu();
    //newOV.enableProdMode();
    const newSession = newOV.initSession();

    setOV(newOV);
    setSession(newSession);

    const connection = () => {
      // 스트림 생성
      newSession.on('streamCreated', (event) => {
        const newSubscriber = newSession.subscribe(event.stream, undefined);
        const newSubscribers = subscribers;
        newSubscribers.push(newSubscriber);

        // setSubscribers([...subscribers]);
        setSubscribers(newSubscribers);
        setCount((prev) => prev + 1);
      });

      // 스트림 삭제
      newSession.on('streamDestroyed', (event) => {
        //event.preventDefault();
        deleteSubscriber(event.stream.streamManager);
        setCount((prev) => prev - 1);
      });

      newSession.on('exception', (exception) => {
        console.warn(exception);
      });

      // 채팅 보내기
      newSession
        .signal({
          data: 'My custom message', // Any string (optional)
          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: 'my-chat', // The type of message (optional)
        })
        .then(() => {
          console.log('Message successfully sent');
        })
        .catch((error) => {
          console.error(error);
        });

      // 채팅 수신
      newSession.on('signal:my-chat', (event) => {
        console.log(event.data); // Message
        console.log(event.from); // Connection object of the sender
        console.log(event.type); // The type of message ("my-chat")
      });

      getToken().then((token) => {
        newSession
          .connect(token, { userName: userName })
          .then(async () => {
            newOV
              .getUserMedia({
                audioSource: false,
                videoSource: undefined,
                resolution: '1280x720',
                frameRate: 10,
              })
              .then((mediaStream) => {
                console.log('비디오트랙' + mediaStream.getVideoTracks());
                var videoTrack = mediaStream.getVideoTracks()[0];

                var publisher = newOV.initPublisher(undefined, {
                  audioSource: undefined,
                  videoSource: videoTrack,
                  publishAudio: true,
                  publishVideo: true,
                  insertMode: 'APPEND',
                  mirror: true,
                });

                publisher.once('accessAllowed', () => {
                  newSession.publish(publisher);
                  setPublisher(publisher);
                  setMainStreamManager(publisher);
                });
              });
            setLoading(false);
          })
          .catch((error) => {
            console.warn(
              'There was an error connecting to the session:',
              error.code,
              error.message
            );
          });
      });
    };

    connection();
  };

  const deleteSubscriber = (streamManager) => {
    let subscribers = subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  };

  // 회의 종료
  const leaveSession = () => {
    const mySession = session;
    if (mySession) {
      mySession.disconnect();
    }
    resetRoomInfo();
    window.location.href(`/team/${teamId}/dashboard`);
  };

  // 모든 요소 종료
  const resetRoomInfo = () => {
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setRoomName('');
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  return (
    <Container>
      {loading ? <Loading /> : null}
      <div>
        <VideoUl>
          {publisher !== undefined && (
            <UserVideo streamManager={publisher} count={count} />
          )}
          {subscribers &&
            subscribers.map((sub, i) => (
              <UserVideo key={i} streamManager={sub} count={count} />
            ))}
        </VideoUl>
      </div>
      <BarContainer>
        <MeetingBar
          isVideo={media.video}
          isMic={media.mic}
          onVideoSetting={onVideoSetting}
          onMicSetting={onMicSetting}
          leaveSession={leaveSession}
        />
      </BarContainer>
    </Container>
  );
};

export default MeetingRoom;
