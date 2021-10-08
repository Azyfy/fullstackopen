import React from 'react';

import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from "react-router-dom";
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';

import theme from '../theme';

const initialValues = {
    username: "",
    password: "",
  };

const validationSchema = yup.object().shape({
    username: yup.string()
                .min(3, "Username must be at least 3 characters long")
                .required("Username is required"),
    password: yup.string()
                .min(3, "Password must be at least 3 characters long")
                .required("Password is required"),
});

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
    const [signIn] = useSignIn();
    let history = useHistory();

    const onSubmit = async (values) => {
        console.log("LOG", values);

        const { username, password } = values;

        try {
          const { data } = await signIn({ username, password });
          console.log("DATA", data);
          history.push("/home")
        } catch (e) {
          console.log("ERROR!", e);
        }

      };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
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