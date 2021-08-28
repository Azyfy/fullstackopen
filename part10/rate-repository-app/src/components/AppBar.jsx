import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';

import theme from "../theme.js";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    padding: 13
    
    // ...
  },
  text: {
      color: theme.colors.textNav,
      fontSize: theme.fontSizes.nav,
  }
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <Pressable >  
            <Text style={styles.text} >Repositories</Text>
        </Pressable>
    </View>
  );
};

export default AppBar;