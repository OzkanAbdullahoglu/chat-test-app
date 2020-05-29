/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { persistor } from '../store';
import './App.css';
import MessageList from '../components/MessageList/MessageList';
import Header from '../components/Header/Header';
import Spinner from '../components/Spinner/Spinner';
import useCurrentViewDims from '../components/ViewPort';

import {
  chatActions,
  getPendingStatus,
} from '../reducers';

const App = ({ setRequestedData, isPending }) => {
  useEffect(() => { setRequestedData(); }, []);
  const { height, width } = useCurrentViewDims();
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Header incomingIcon={false} incomingAvatar={false} />
      <Header incomingIcon incomingAvatar />
      {isPending ? (
        <Spinner data-test="spinner" />
      ) : (
        <MessageList
          width={width}
          height={height}
        />
      )}

    </PersistGate>
  );
};

App.propTypes = {
  setRequestedData: PropTypes.func,
  isPending: PropTypes.bool,
};

const mapStateToProps = (store) => ({
  isPending: getPendingStatus(store),
});

const withRedux = connect(
  mapStateToProps,
  { ...chatActions }
);

export default compose(withRedux)(App);
