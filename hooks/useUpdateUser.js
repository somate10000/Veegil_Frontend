import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const useUpdateUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const { authContext } = useAuthContext();

  const update = async (email, newAmount) => {
    setIsLoading(true);
    setError(null);

    const data = { email, newAmount };
    console.log("sss", data);

    try {
      const reponse = await axios
        .post("https://veegil-kjpc.onrender.com/api/update", data)
        //.post("http://192.168.67.186:4000/api/update", data)
        .then((data) => {
          console.log("DATA", data.data);

          SecureStore.setItemAsync("UserDetails", JSON.stringify(data.data));
        })
        .catch((e) => console.log(e));
      setIsLoading(false);
      //console.log("Response", AccessToken);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      setError(e.response.data);
      console.log("erroe", error?.general);
    }
  };

  return { update, isLoading, error, userDetails };
};
