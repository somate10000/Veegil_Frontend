import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Keyboard,
  Platform,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { DotIndicator } from "react-native-indicators";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, provider } = useLogin();

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

          <Text className="mt-5 text-xl font-bold">Login</Text>
        </View>
        <View className="mt-4">
          <View
            className={`h-14 px-3  mb-4 text-base border  items-center flex-row rounded-md  ${"bg-[#eeeeee]  border-zinc-300"}`}
          >
            <TextInput
              placeholderTextColor={"#5f5e5e"}
              placeholder="E-mail"
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
              className="w-[90%]  h-full text-base  text-[#5f5e5e] "
            />
          </View>

          <View
            className={`h-14 px-3    text-base border items-center flex-row rounded-md mb-3  ${"bg-[#eeeeee]  border-zinc-300"}`}
          >
            <TextInput
              placeholderTextColor={"#5f5e5e"}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              className="w-[90%]  h-full text-base  text-[#5f5e5e] "
            />
          </View>
          <Text className="mb-2 text-xs text-red-700">
            {error?.password || error?.general || error?.message}
          </Text>

          <View className="flex-row items-center justify-center w-full mb-2">
            <TouchableOpacity
              className={`w-[17%] rounded-md h-14 items-center justify-center border border-[#484b53]  bg-[#4c6299]  mr-3`}
              style={{
                backgroundColor: "rgba(0,0,0,0.8)",
              }}
            >
              <MaterialIcons name="fingerprint" size={28} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity
              className={`${
                isLoading ? "bg-gray-600" : "bg-black border border-[#484b53]"
              }  h-14 rounded-md items-center justify-center w-[65%]`}
              onPress={() => [
                Keyboard.dismiss(),
                login(email.toLocaleLowerCase(), password),
              ]}
              disabled={isLoading}
            >
              <Text className="text-base text-white">Login</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row mt-2 ml-6">
            <Text className="">Don't have an account?{"  "}</Text>
            <Link asChild href={"/signup"}>
              <TouchableOpacity>
                <Text
                  className="text-bold  text-[#222E50]"
                  style={{
                    color: "#222E50",
                  }}
                >
                  Signup
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

export default Login;
