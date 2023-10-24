import * as React from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            usersData: action.usersData,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            usersData: action.usersData,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            usersData: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      usersData: null,
    }
  );

  React.useEffect(() => {
    const fetchUser = async () => {
      let userToken, userDetails;

      try {
        userToken = await SecureStore.getItemAsync("AccessToken");
        userDetails = await SecureStore.getItemAsync("UserDetails");
      } catch (e) {
        console.log(console.error(e));
      }
      dispatch({
        type: "RESTORE_TOKEN",
        token: userToken,
        usersData: userDetails,
      });
    };
    fetchUser();
  }, [state]);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log("DATA", data);

        dispatch({
          type: "SIGN_IN",
          token: data.payload,
          usersData: data.usersData,
        });
      },
      signOut: async () => {
        SecureStore.setItemAsync("UserDetails", "");
        SecureStore.setItemAsync("UserData", "");
        console.log("DONE"), dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        console.log("DATA", data);
        dispatch({
          type: "SIGN_IN",
          token: data.payload,
          usersData: data.usersData,
        });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ authContext, state }}>
      {children}
    </AuthContext.Provider>
  );
}
