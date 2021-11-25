import { useState } from 'react';
import post_login from 'src/api/login';

export default () => {
  const handlePostLoginRequest = ({ email, password }) => post_login({ email, password }).then((res) => res.json());

  return { handlePostLoginRequest };
};
