import React from 'react';

import { Text, TextInput, View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';

import theme from '../theme';

const initialValues = {
    username: "",
    password: "",
  };

const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      padding : 10,
      margin: 5,
      borderRadius: 5,
      textAlign: "center",
    },
  });

const SignIn = () => {

    const onSubmit = (values) => {
        console.log("LOG", values);
      };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit }) => (
        <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <Pressable onPress={handleSubmit} style={styles.button} >
                <Text style={{ color: "white" }} >Sign In</Text>
            </Pressable>
        </View>
        )}
    </Formik>
  );
};

export default SignIn;