import React from 'react';

import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';

import Main from './src/components/Main.jsx';
import createApolloClient from './src/utils/apolloClient.js';

const apolloClient = createApolloClient();

const App = () => {
  console.log("Manifest", Constants.manifest);
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient} >
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;