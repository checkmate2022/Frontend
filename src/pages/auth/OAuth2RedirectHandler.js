import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const ACCESS_TOKEN = 'ACCESS_TOKEN';

  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    var results = regex.exec(window.location.search);
    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  const getToken = () => {
    const token = getUrlParameter('token');

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
    }
    navigate('/main');
  };

  useEffect(() => {
    getToken();
  }, []);
};

export default OAuth2RedirectHandler;
