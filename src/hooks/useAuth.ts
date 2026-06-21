import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, clearAuthToken } from '../services/api';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getAuthToken());
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => setIsLoggedIn(!!getAuthToken());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const logout = useCallback(() => {
    clearAuthToken();
    setIsLoggedIn(false);
    navigate('/');
  }, [navigate]);

  return { isLoggedIn, logout };
}
