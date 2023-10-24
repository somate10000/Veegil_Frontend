import { useAuthContext } from "./useAuthContext";
import * as SecureStore from "expo-secure-store";

export const useSignout = () => {
  const { authContext } = useAuthContext();

  const signout = async () => {
    let result = await SecureStore.deleteItemAsync("AccessToken").then(() => {
      authContext.signOut();
    });
    console.log(result);
  };

  return { signout };
};
