import { useState, useEffect } from 'react';
import { getUserInfo, type UserInfo } from '../services/api';

export function useUserInfo(): UserInfo | null {
  const [info, setInfo] = useState<UserInfo | null>(getUserInfo);

  useEffect(() => {
    const update = () => setInfo(getUserInfo());
    window.addEventListener('userinfo:updated', update);
    return () => window.removeEventListener('userinfo:updated', update);
  }, []);

  return info;
}
