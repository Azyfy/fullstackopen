import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList.jsx';
import AppBar from './AppBar.jsx';

import theme from '../theme.js';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundMain,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;