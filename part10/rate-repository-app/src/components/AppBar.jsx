import React from 'react';
import { useContext } from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";

import { useQuery,useApolloClient } from '@apollo/client';
import { GET_AUTHORIZATION } from '../graphql/queries.js';

import AuthStorageContext from '../contexts/AuthStorageContext';

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
  nav: {
    padding: 11,
  }
});

const AppBar = () => {
  const { data, error, loading } = useQuery(GET_AUTHORIZATION);

  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  let loggedIn = false;

  console.log("GET AUTH", data)
  if(data) {
    console.log("GET AUTH2", data.authorizedUser)
    if(data.authorizedUser) {
      loggedIn = true;
    }
  }

  async function handleSignOut () {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    console.log("OUT")
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal >
        <Pressable >
          <Link to="/" style={styles.nav} > 
            <Text style={styles.text} >Repositories</Text>
          </Link>
        </Pressable>
        { (loggedIn) ?  <Pressable onPress={handleSignOut} style={styles.nav} >
          <Text style={styles.text} >Sign Out</Text>
        </Pressable>  
        : 
        <Link to="/signin" style={styles.nav} >
        <Text style={styles.text} >Sign In</Text>
      </Link> }
        
      </ScrollView>
    </View>
  );
};

export default AppBar;