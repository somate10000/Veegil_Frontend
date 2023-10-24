import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Platform,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DotIndicator } from "react-native-indicators";

import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, isLoading, error, provider } = useSignup();

  provider === true ? router.replace("/") : null;

  return (
    <SafeAreaView className={" h-full"}>
      <StatusBar translucent />

      <View className="pt-20 px-[32px]">
        <View className="items-center justify-center">
          <LinearGradient
            start={{ x: 0.1, y: 2 }}
            end={{ x: 0.8, y: 0.1 }}
            // locations={[0.1, 10]}
            colors={["#EDF7F6", "black"]}
            className="items-center justify-center rounded-full w-[115px] h-[115px] "
          >
            <View className="items-center justify-center w-[109px] h-[109px] rounded-full">
              <Ionicons
                name="logo-amplify"
                size={80}
                color={"#ffff"}
                style={{ marginLeft: 4, marginTop: -6 }}
              />
            </View>
          </LinearGradient>
          <Text className="mt-5 text-xl font-bold">Signup</Text>
        </View>
        <View className="mt-4">
          <View
            className={`h-14 px-3  mb-4 text-base border  items-center flex-row rounded-md  ${"bg-[#eeeeee]  border-zinc-300"}`}
          >
            <TextInput
              placeholderTextColor={"#5f5e5e"}
              placeholder="Full Name"
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              blurOnSubmit={true}
              className="w-[90%]  h-full text-base  text-[#5f5e5e] "
            />
          </View>
          <View
            className={`h-14 px-3  mb-4 text-base border  items-center flex-row rounded-md  ${"bg-[#eeeeee]  border-zinc-300"}`}
          >
            <TextInput
              placeholderTextColor={"#5f5e5e"}
              placeholder="E-mail"
              onChangeText={(text) => setEmail(text)}
              value={email}
              inputMode="email"
              blurOnSubmit={true}
              className="w-[90%]  h-full text-base  text-[#5f5e5e] "
            />
          </View>
          <View
            className={`h-14 px-3  mb-4 text-base border  items-center flex-row rounded-md  ${"bg-[#eeeeee]  border-zinc-300"}`}
          >
            <TextInput
              placeholderTextColor={"#5f5e5e"}
              placeholder="Phone number"
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
              inputMode="decimal"
              blurOnSubmit={true}
              className="w-[90%]  h-full text-base  text-[#5f5e5e] "
            />
          </View>
          <View
            className={`h-14 px-3    text-base border items-center flex-row rounded-md mb-4  ${"bg-[#eeeeee]  border-zinc-300"}`}
          >
            <TextInput
              placeholderTextColor={"#5f5e5e"}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              blurOnSubmit={true}
              className="w-[90%]  h-full text-base  text-[#5f5e5e] "
            />
          </View>
          <View
            className={`h-14 px-3    text-base border items-center flex-row rounded-md mb-3  ${"bg-[#eeeeee]  border-zinc-300"}`}
          >
            <TextInput
              placeholderTextColor={"#5f5e5e"}
              placeholder="Confirm Password"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              blurOnSubmit={true}
              secureTextEntry={true}
              className="w-[90%]  h-full text-base  text-[#5f5e5e] "
            />
          </View>

          <Text className="mb-2 text-xs text-red-700">
            {error?.password || error?.general || error?.message}
          </Text>
          <View className="flex-row items-center justify-center w-full ">
            <TouchableOpacity
              className={`${
                isLoading ? "bg-gray-600" : "bg-black border border-[#484b53]"
              }  h-14 rounded-md items-center justify-center w-[75%]`}
              onPress={() =>
                signup(
                  email.toLocaleLowerCase().trim(),
                  password,
                  confirmPassword,
                  phoneNumber,
                  fullName
                )
              }
              disabled={isLoading}
            >
              <Text className="text-base text-white">Signup</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-2">
            <Text className="">Already have an account?{"  "}</Text>
            <Link asChild href={"/login"}>
              <TouchableOpacity>
                <Text
                  className="text-bold  text-[#27355c]"
                  style={{
                    color: "#222E50",
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* <Link href={"/(tabs)/home"} asChild>
          <Button title="move" />
        </Link> */}
      </View>

      {isLoading && (
        <View className="absolute items-center justify-center w-full h-full bg-black/80">
          <DotIndicator color="white" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Signup;
