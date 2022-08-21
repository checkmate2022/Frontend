import { API_BASE_URL } from '../app-config';
import axios from 'axios';

const ACCESS_TOKEN = 'ACCESS_TOKEN';

// 게시판 등록(채널 등록)
export const onChannelAdd = (teamId, channelName) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(
    API_BASE_URL +
      `/api/v1/channel?teamId=${teamId}&channelName=${channelName}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }
  )
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.success) {
        let channelId = result.data.channelSeq;
        window.location.href = `/team/${teamId}/teamchannel/${channelId}`;
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 채널 수정
export const onChannelChange = (channelId, channelName) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(
    API_BASE_URL + `/api/v1/channel/${channelId}?channelName=${channelName}`,
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

// 채널 삭제
export const onChannelDelete = (teamId, channelId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + `/api/v1/channel/${channelId}`, {
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
        window.location.href = `/team/${teamId}/dashboard`;
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 게시글 생성
export const onPostAdd = (teamId, channelId, title, content) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const Info = {
    title: title,
    content: content,
  };

  fetch(API_BASE_URL + `/api/v1/board?channelId=${channelId}`, {
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
        let boardId = result.data.boardSeq;
        console.log(result);
        window.location.href = `/team/${teamId}/teamchannel/${channelId}/board/${boardId}`;
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 게시글 수정
export const onPostChange = (teamId, channelId, title, content, boardId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const Info = {
    title: title,
    content: content,
  };

  fetch(API_BASE_URL + `/api/v1/board/${boardId}`, {
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
        window.location.href = `/team/${teamId}/teamchannel/${channelId}/board/${boardId}`;
      } else {
        alert('다시 시도해주세요!');
      }
    });
};
// 게시글 삭제
export const onPostDelete = (teamid, boardId, channelId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + `/api/v1/board/${boardId}`, {
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
        window.location.href = `/team/${teamid}/teamchannel/${channelId}`;
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 채널별 게시글 조회
export const onChannelBoardGet = (channelId, setBoardList, setLoading) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  setLoading(true);
  fetch(API_BASE_URL + `/api/v1/board/channel/${channelId}`, {
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
        setBoardList(result.list);
        setLoading(false);
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 게시판 단건 조회
export const onBoardGet = (boardId, setBoard) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + `/api/v1/board/board/${boardId}`, {
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
        console.log(result.data);
        setBoard(result.data);
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 팀별 채널 조회
export const onChannelGet = (teamId, setChannelList) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(API_BASE_URL + `/api/v1/channel/team/${teamId}`, {
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
        console.log(result.list);
        setChannelList(result.list);
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 댓글 생성
export const onCommentAdd = (boardId, content, setCommentList) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  fetch(
    API_BASE_URL + `/api/v1/comment?boardId=${boardId}&content=${content}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }
  )
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.success) {
        onCommentGet(boardId).then((result) => setCommentList(result));
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// 댓글 수정
export const onCommentChange = async (commentId, content) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  return await fetch(
    API_BASE_URL + `/api/v1/comment?commentSeq=${commentId}&content=${content}`,
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
        return result.success;
      } else {
        alert('다시 시도해주세요!');
        return result.success;
      }
    });
};

// 댓글 삭제
export const onCommentDelete = async (commentId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  return await fetch(API_BASE_URL + `/api/v1/comment?commentSeq=${commentId}`, {
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
        return result.success;
      } else {
        alert('다시 시도해주세요!');
        return result.success;
      }
    });
};

// 게시글 별 댓글 조회
export const onCommentGet = async (boardId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  return await fetch(API_BASE_URL + `/api/v1/comment/${boardId}`, {
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
        console.log(result.list);
        return result.list;
      } else {
        alert('다시 시도해주세요!');
      }
    });
};

// export const onCommentGet = async (boardId) => {
//   const accessToken = localStorage.getItem(ACCESS_TOKEN);
//   return await axios
//     .get(API_BASE_URL + `/api/v1/comment/${boardId}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: 'Bearer ' + accessToken,
//       },
//     })
//     .then((response) => {
//       if (response.data.success) {
//         console.log(response.data.list);
//         return response.data.list;
//       } else {
//         alert('다시 시도해주세요!');
//       }
//     });
// };
