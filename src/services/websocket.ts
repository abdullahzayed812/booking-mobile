import { io, Socket } from 'socket.io-client';
import EncryptedStorage from 'react-native-encrypted-storage';
import { store } from '../app/store';
import { API_CONFIG } from '../config/api';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  async connect(): Promise<void> {
    try {
      const token = await EncryptedStorage.getItem('access_token');

      if (!token) {
        console.warn('No access token available for WebSocket connection');
        return;
      }

      this.socket = io(API_CONFIG.BASE_URL.replace('/api', ''), {
        auth: {
          token,
        },
        transports: ['websocket'],
        upgrade: true,
        rememberUpgrade: true,
      });

      this.setupEventListeners();
      this.setupReconnection();
    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;

      // Subscribe to user-specific events
      const state = store.getState();
      const userId = state.auth.user?.id;
      const userRole = state.auth.user?.role;

      if (userId) {
        this.socket?.emit('subscribe', {
          userId,
          role: userRole,
        });
      }
    });

    this.socket.on('disconnect', reason => {
      console.log('WebSocket disconnected:', reason);
    });

    this.socket.on('connect_error', error => {
      console.error('WebSocket connection error:', error);
    });

    // Real-time event handlers
    this.socket.on('appointment:created', data => {
      store.dispatch({
        type: 'appointmentApi/invalidateTags',
        payload: ['Appointment'],
      });
      this.notifyAppointmentUpdate('created', data);
    });

    this.socket.on('appointment:updated', data => {
      store.dispatch({
        type: 'appointmentApi/invalidateTags',
        payload: ['Appointment'],
      });
      this.notifyAppointmentUpdate('updated', data);
    });

    this.socket.on('appointment:cancelled', data => {
      store.dispatch({
        type: 'appointmentApi/invalidateTags',
        payload: ['Appointment'],
      });
      this.notifyAppointmentUpdate('cancelled', data);
    });

    this.socket.on('appointment:confirmed', data => {
      store.dispatch({
        type: 'appointmentApi/invalidateTags',
        payload: ['Appointment'],
      });
      this.notifyAppointmentUpdate('confirmed', data);
    });

    this.socket.on('availability:updated', data => {
      store.dispatch({
        type: 'doctorApi/invalidateTags',
        payload: ['Doctor', 'Availability'],
      });
      this.notifyAvailabilityUpdate(data);
    });

    this.socket.on('doctor:status_changed', data => {
      store.dispatch({ type: 'doctorApi/invalidateTags', payload: ['Doctor'] });
      this.notifyDoctorStatusChange(data);
    });
  }

  private setupReconnection(): void {
    if (!this.socket) return;

    this.socket.on('disconnect', () => {
      this.attemptReconnection();
    });
  }

  private attemptReconnection(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    setTimeout(() => {
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
      );
      this.connect();
    }, delay);
  }

  private notifyAppointmentUpdate(type: string, data: any): void {
    // You can implement push notifications or in-app notifications here
    console.log(`Appointment ${type}:`, data);
  }

  private notifyAvailabilityUpdate(data: any): void {
    console.log('Availability updated:', data);
  }

  private notifyDoctorStatusChange(data: any): void {
    console.log('Doctor status changed:', data);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Method to emit events
  emit(event: string, data: any): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('WebSocket not connected, cannot emit event:', event);
    }
  }

  // Subscribe to specific appointment updates
  subscribeToAppointment(appointmentId: string): void {
    this.emit('subscribe:appointment', { appointmentId });
  }

  unsubscribeFromAppointment(appointmentId: string): void {
    this.emit('unsubscribe:appointment', { appointmentId });
  }

  // Subscribe to doctor availability updates
  subscribeToDoctorAvailability(doctorId: string): void {
    this.emit('subscribe:doctor_availability', { doctorId });
  }

  unsubscribeFromDoctorAvailability(doctorId: string): void {
    this.emit('unsubscribe:doctor_availability', { doctorId });
  }
}

export const websocketService = new WebSocketService();
