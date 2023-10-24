import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const { authContext } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const data = { email, password };
    console.log("sss", data);

    try {
      const reponse = await axios.post(
        // "https://veegil-kjpc.onrender.com/api/login",
        "http://192.168.79.186:4000/api/login",
        data
      );
      const AccessToken = reponse.data.stsTokenManager.accessToken;

      await axios
        //.post("https://veegil-kjpc.onrender.com/api/getUserDetails", { email })
        .post("http://192.168.79.186:4000/api/getUserDetails", { email })
        .then((data) => {
          console.log(data.data);
          setUserDetails(data.data);
          SecureStore.setItemAsync("UserData", JSON.stringify(data.data));
          SecureStore.setItemAsync("UserDetails", JSON.stringify(data.data));
          SecureStore.setItemAsync("AccessToken", AccessToken).then(() => {
            authContext.signIn({
              type: "LOGIN",
              payload: AccessToken,
              usersData: data.data,
            });
          });
        });
      // .catch((e) => console.log(e));

      let result = await SecureStore.getItemAsync("AccessToken");
      if (result) {
        console.log("hhhhh");
        //  alert("🔐 Here's your value 🔐 \n" + result);
        setProvider(true);
      } else {
        console.log("hhhhh");
        alert("No values stored under that key.");
      }

      setIsLoading(false);
      //router.replace("/(app)/(tabs)/home");
      //console.log("Response", AccessToken);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      setError(e.response.data);
      console.log("erroe", error?.general);
    }
  };

  return { login, isLoading, error, userDetails, provider };
};
