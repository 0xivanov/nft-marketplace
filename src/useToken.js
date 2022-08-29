import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) return token
    else return null
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    console.log(userToken)
    if (userToken === undefined) {
      localStorage.clear()
      setToken(null);
    } else {
      localStorage.setItem('token', userToken);
      setToken(userToken);
    }
  };

  return {
    setToken: saveToken,
    token
  }
}