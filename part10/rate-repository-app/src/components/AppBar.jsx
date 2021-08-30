import React from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";

import theme from "../theme.js";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    padding: 13,
  },
  text: {
      color: theme.colors.textNav,
      fontSize: theme.fontSizes.nav,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal >
        <Pressable >
          <Link to="/"> 
            <Text style={styles.text} >Repositories</Text>
          </Link>
        </Pressable>
        <Link to="/signin">
          <Text style={styles.text} >Sign In</Text>
        </Link>
        
      </ScrollView>
    </View>
  );
};

export default AppBar;