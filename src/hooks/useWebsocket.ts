import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { websocketService } from '../services/websocket';

export const useWebSocket = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      websocketService.connect();
    } else {
      websocketService.disconnect();
    }

    return () => {
      websocketService.disconnect();
    };
  }, [isAuthenticated]);

  return websocketService;
};
