import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: "white",
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "blue",
        borderStyle: "solid",
    }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
      styles.inputField,
      style,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;