/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { compose } from 'recompose';
import { persistor } from './store';
import './App.css';
import MessageList from './components/MessageList/MessageList';
import Header from './components/Header/Header';
import Spinner from './components/Spinner/Spinner';

import {
  chatActions,
  getPendingStatus,
} from '../src/reducers';

const App = ({ setRequestedData, isPending }) => {
  useEffect(() => { setRequestedData(); }, []);
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Header incomingIcon={false} incomingAvatar={false} />
      <Header incomingIcon incomingAvatar />
      {isPending ? (
        <Spinner />
      ) : (
        <MessageList />
      )}

    </PersistGate>
  );
};

const mapStateToProps = (store) => ({
  isPending: getPendingStatus(store),
});

const withRedux = connect(
  mapStateToProps,
  { ...chatActions }
);

export default compose(withRedux)(App);
