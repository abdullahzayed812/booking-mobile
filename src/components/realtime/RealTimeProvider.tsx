import React, { createContext, useContext } from 'react';
import { useWebSocket } from '../../hooks/useWebsocket';

interface RealTimeContextType {
  websocket: any;
  subscribeToAppointment: (appointmentId: string) => void;
  unsubscribeFromAppointment: (appointmentId: string) => void;
  subscribeToDoctorAvailability: (doctorId: string) => void;
  unsubscribeFromDoctorAvailability: (doctorId: string) => void;
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(
  undefined,
);

export const useRealTime = () => {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTime must be used within a RealTimeProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const RealTimeProvider: React.FC<Props> = ({ children }) => {
  const websocket = useWebSocket();

  const subscribeToAppointment = (appointmentId: string) => {
    websocket.subscribeToAppointment(appointmentId);
  };

  const unsubscribeFromAppointment = (appointmentId: string) => {
    websocket.unsubscribeFromAppointment(appointmentId);
  };

  const subscribeToDoctorAvailability = (doctorId: string) => {
    websocket.subscribeToDoctorAvailability(doctorId);
  };

  const unsubscribeFromDoctorAvailability = (doctorId: string) => {
    websocket.unsubscribeFromDoctorAvailability(doctorId);
  };

  const contextValue: RealTimeContextType = {
    websocket,
    subscribeToAppointment,
    unsubscribeFromAppointment,
    subscribeToDoctorAvailability,
    unsubscribeFromDoctorAvailability,
  };

  return (
    <RealTimeContext.Provider value={contextValue}>
      {children}
    </RealTimeContext.Provider>
  );
};
