import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Video = styled.video`
  // width: 100%;
  // height: auto;
  // float: left;
  // cursor: pointer;

  width: 50%;
  height: 50%;
  object-fit: contain;
  transform: rotateY(180deg);
`;

function OvVideo({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <Video autoPlay={true} ref={videoRef} />;
}

export default OvVideo;
