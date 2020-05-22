/* eslint-disable linebreak-style */
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import './App.css';
import MessageList from './components/MessageList/MessageList';
import Header from './components/Header/Header';
import useCurrentViewDims from './components/ViewPort';

const App = () => {
  const { height } = useCurrentViewDims();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header incomingIcon={false} incomingAvatar={false} />
        <Header incomingIcon incomingAvatar />
        <MessageList windowHeight={height} />
      </PersistGate>
    </Provider>
  );
};

export default App;
