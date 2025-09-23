import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

import { store, persistor } from './src/app/store';
import { AppNavigator } from './src/navigation/AppNavigator';
import { RealTimeProvider } from './src/components/realtime/RealTimeProvider';
import { LoadingScreen } from './src/components/LoadingScreen';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <RealTimeProvider>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </RealTimeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
