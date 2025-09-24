import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { store } from '../app/store';

class NotificationService {
  async initialize(): Promise<void> {
    try {
      // Request permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        await this.getFCMToken();
        this.setupNotificationListeners();
      }
    } catch (error) {
      console.error('Notification initialization failed:', error);
    }
  }

  private async getFCMToken(): Promise<void> {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        await EncryptedStorage.setItem('fcm_token', token);

        // Send token to backend
        await this.sendTokenToBackend(token);
      }
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
  }

  private async sendTokenToBackend(token: string): Promise<void> {
    try {
      const state = store.getState();
      const accessToken = state.auth.accessToken;

      if (accessToken) {
        // You would call your API to register the FCM token
        console.log('Would send token to backend:', token);
      }
    } catch (error) {
      console.error('Failed to send token to backend:', error);
    }
  }

  private setupNotificationListeners(): void {
    // Handle notification when app is in foreground
    messaging().onMessage(
      async (remoteMessage: { notification: { title: any; body: any } }) => {
        console.log('Received foreground message:', remoteMessage);

        if (remoteMessage.notification) {
          Alert.alert(
            remoteMessage.notification.title || 'Notification',
            remoteMessage.notification.body || 'You have a new notification',
          );
        }
      },
    );

    // Handle notification when app is in background/quit
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Handle notification tap when app is in background
    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      this.handleNotificationNavigation(remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          this.handleNotificationNavigation(remoteMessage);
        }
      });

    // Token refresh listener
    messaging().onTokenRefresh(async (token: string) => {
      console.log('FCM token refreshed:', token);
      await EncryptedStorage.setItem('fcm_token', token);
      await this.sendTokenToBackend(token);
    });
  }

  private handleNotificationNavigation(remoteMessage: any): void {
    const { data } = remoteMessage;

    if (data?.type === 'appointment_reminder') {
      // Navigate to appointment details
      console.log('Navigate to appointment:', data.appointmentId);
    } else if (data?.type === 'appointment_updated') {
      // Navigate to appointments list or specific appointment
      console.log('Navigate to updated appointment:', data.appointmentId);
    } else if (data?.type === 'availability_changed') {
      // Navigate to doctor availability
      console.log('Navigate to doctor availability:', data.doctorId);
    }
  }

  async scheduleLocalNotification(
    title: string,
    body: string,
    data?: any,
    scheduledTime?: Date,
  ): Promise<void> {
    // This would use a local notification library like @react-native-community/push-notification-ios
    // or react-native-push-notification for Android
    console.log('Would schedule local notification:', {
      title,
      body,
      data,
      scheduledTime,
    });
  }
}

export const notificationService = new NotificationService();
