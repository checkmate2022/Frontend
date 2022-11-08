import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import Modal from 'react-modal';
import GreyButton from '../GreyButton';
import GreyLabel from '../GreyLabel';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const WebcamModal = ({ setImgSrc, setImgfile }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deviceId, setDeviceId] = useState('');

  const handleDevices = useCallback(
    (mediaDevices) => {
      setDeviceId(
        mediaDevices.filter(({ kind }) => kind === 'videoinput')[0].deviceId
      );
    },
    [setDeviceId]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const videoConstraints = {
    width: 600,
    height: 620,
    facingMode: 'selfie',
    deviceId: deviceId,
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 웹캠
  const webcamRef = useRef(null);

  const dataURLtoFile = (url) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'origin.png', { type: 'image/png' });
        setImgfile(file);
      });
  };

  const capture = useCallback(() => {
    const img = webcamRef.current.getScreenshot();
    setImgSrc(img);
    dataURLtoFile(img);
    setIsOpen(false);
    //console.log(img);
  }, [webcamRef, setImgSrc]);

  return (
    <div>
      <GreyLabel text='카메라 사용' />
      <GreyButton text='촬영' onClick={openModal} width='40px' height='32px' />
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={closeModal}
      >
        <Webcam
          videoConstraints={videoConstraints}
          audio={false}
          ref={webcamRef}
          mirrored={true}
          screenshotFormat='image/jpeg'
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '1%',
          }}
        >
          <GreyButton
            text='캡쳐'
            onClick={capture}
            width='44px'
            height='32px'
          />
          <div style={{ width: '10px' }} />
          <GreyButton
            text='닫기'
            onClick={closeModal}
            width='44px'
            height='32px'
          />
        </div>
      </Modal>
    </div>
  );
};
export default WebcamModal;
