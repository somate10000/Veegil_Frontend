import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [provider, setProvider] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const { authContext } = useAuthContext();

  function genRandonString(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charLength = chars.length;
    var result = "";
    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }

  const signup = async (
    email,
    password,
    confirmPassword,
    phoneNumber,
    fullName
  ) => {
    setIsLoading(true);
    setError(null);

    console.log(genRandonString(20));

    const user_data = {
      account_name: fullName,
      country: "NG",
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: Number(phoneNumber),
      account_reference: "veegil@" + genRandonString(13),
      created_on: Date.now(),
      bvn: "12345678901",
      date_of_birth: "1972/05/02",
      title: "Mr",
      gender: "Male",
      amount: 0,
      bank_code: "044",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/cash-282015.appspot.com/o/woman.jpg?alt=media&token=d3984b9f-1c0a-41ea-8da7-e6cfb2628eeb",
    };

    console.log(": ", JSON.stringify(user_data));

    try {
      await axios
        //.post("https://veegil-kjpc.onrender.com/api/signup", user_data)
        .post("http://192.168.79.186:4000/api/signup", user_data)
        .then((data) => {
          // console.log("sss", data.data);
          //setUserDetails(data.data);
          const AccessToken = data.data;
          SecureStore.setItemAsync("UserData", JSON.stringify(user_data));
          SecureStore.setItemAsync("UserDetails", JSON.stringify(user_data));
          SecureStore.setItemAsync("AccessToken", AccessToken).then(() => {
            authContext.signUp({
              type: "LOGIN",
              payload: AccessToken,
              usersData: user_data,
            });
          });
        });
      // .catch((e) => console.log("e));

      let result = await SecureStore.getItemAsync("AccessToken");
      if (result) {
        console.log("hhhhh");
        alert("🔐 Here's your value 🔐 \n" + result);
        setProvider(true);
      } else {
        console.log("hhhhh");
        alert("No values stored under that key.");
      }

      setIsLoading(false);

      //dispatch({ type: "LOGIN", payload: AccessToken });
    } catch (errors) {
      setIsLoading(false);
      console.log("errors: ", errors.message);
      if (errors.message === "Request failed with status code 403") {
        alert("Email already in use");
      }
      if (errors.message === "Network Error") {
        alert("Network Error");
      } else {
        setError(error?.general);
      }
    }
  };

  return { signup, isLoading, error, provider };
};
