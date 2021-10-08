import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from "../graphql/mutations";
import { useContext } from 'react';

import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  console.log("authSt", authStorage)
  console.log("apolloC", apolloClient)

    const [mutate, result] = useMutation(SIGN_IN, {
        onError: (error) => {
            console.log( "ERROR", error)
            }
        });
  
    const signIn = async ({ username, password }) => {

      const { data } = await mutate({ variables: { username, password } })
      console.log(data)
      await authStorage.setAccessToken(data);
      apolloClient.resetStore();
      return data
    };

    console.log("RESULT", result)

    return [signIn, result];
  };

export default useSignIn;