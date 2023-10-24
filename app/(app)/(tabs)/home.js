import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import * as LocalAuthentication from "expo-local-authentication";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";

import Header from "../../../components/Header";
import Buttons from "../../../components/HomeButtons";
import Protocol from "../../../components/StringHandler";

const One = () => {
  const [eye, setEye] = useState(false);
  const savedBiometrics = LocalAuthentication.isEnrolledAsync();
  return (
    <SafeAreaView className={`pt-10 h-full bg-white `}>
      <StatusBar translucent animated />
      <View className="px-3">
        <Header />
        {/* <Link href={"/(auth)/login"}>
          <Text>LOGIN</Text>
        </Link> */}
        <View
          className={
            "h-56 mt-3 overflow-hidden  rounded-2xl border-2 border-[#484b53] shadow-lg"
          }
          style={{
            shadowColor: "#7f5539",
            backgroundColor: "#222E50",
          }}
        >
          <View className="absolute w-full h-full bg-black/95">
            <View className="px-5 pt-6">
              <Text className="text-xs leading-none text-white ">
                Available Balance
              </Text>
              <View className="flex-row items-center justify-between mt-1">
                {eye ? (
                  <Text className="text-2xl leading-none text-white ">
                    ₦ ******.<Text className="text-xs leading-8">00</Text>
                  </Text>
                ) : (
                  <Protocol />
                )}
                <TouchableOpacity
                  className="items-center justify-center h-10"
                  onPress={() =>
                    eye
                      ? savedBiometrics
                        ? [
                            Haptics.impactAsync(
                              Haptics.ImpactFeedbackStyle.Medium
                            ),
                            LocalAuthentication.authenticateAsync({
                              promptMessage: "Verify Identity",
                              disableDeviceFallback: true,
                              cancelLabel: "cancel",
                              fallbackLabel: "Ego",
                            }).then((go) => [setEye(!go.success)]),
                          ]
                        : null
                      : [setEye(!eye), console.log("wrong")]
                  }
                >
                  <Entypo
                    name={!eye ? "eye" : "eye-with-line"}
                    size={25}
                    style={{ marginLeft: 15, color: "white" }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="items-center justify-center w-full h-12 mt-3 overflow-hidden border border-white rounded-md shadow-lg shadow-amber-900">
                <LinearGradient
                  //#f99a49
                  start={{ x: 0.1, y: 1 }}
                  end={{ x: 0.9, y: 0.7 }}
                  //locations={[0.1, 10]}
                  colors={["rgba(0,0,0,1)", "#1a1a1a", "black"]}
                  //colors={["#EDEADE", "#9d8dca", "#131142"]}
                  className="items-center justify-center w-full h-full"
                >
                  <Text className="text-white ">FUND WALLET</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center justify-between pl-5 pr-5 mt-2">
              <Animatable.View
                animation="pulse"
                iterationCount="infinite"
                className="border-2 border-[#676683] mt-[5px] mr-1 w-10 h-10 rounded-full items-center justify-center"
              >
                <Ionicons name="logo-amplify" size={24} color={"#fff"} />
              </Animatable.View>
              <TouchableOpacity className="flex-row items-center mt-3">
                <Text className="text-xs   text-zinc-200 mt-[2px]">
                  Recent Transactions
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={14}
                  color={"rgb(228 228 231)"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View className="w-full px-[10px]">
          <View className="flex-row justify-around">
            <Buttons
              id={1}
              title="Scan" //"Scan  Pay Code"
              onPress={"qrcode"}
            />
            <Buttons
              id={5}
              title="Transfer" //"Transfer to Accounts"
              onPress={"transferNGNBanks"}
            />
            <Buttons
              id={"2"}
              title="Bills" //"Pay Bills and more"
              onPress={"bills"}
            />

            <Buttons
              id={3}
              title="History" //"View All Transactions"
              onPress={"transactions"}
            />
            <Buttons
              id={4}
              title="Banks" //"Manage Other Bank Accounts"
            />
          </View>
        </View>
        <View className="px-4">
          <View
            className={
              "flex-row w-full h-20 items-center mt-4 border border-[#4b4b4d] overflow-hidden rounded-xl shadow"
            }
            style={{
              shadowColor: "white",
              backgroundColor: "white",
            }}
          >
            <View className="mx-4 overflow-hidden rounded-full">
              <Image
                source={require("../../../assets/connect.png")}
                className="w-8 h-8 "
              />
            </View>
            <Text
              className={`border-l pl-2 border-[#a2a6b1] w-[75%] text-xs  text-black/80  `}
            >
              Get to use our domestic rate at a fair price.
            </Text>
          </View>
          <View
            className={`flex-row w-full h-20 items-center mt-4 border border-[#4b4b4d]  overflow-hidden rounded-xl shadow shadow-white  text-zinc-200`}
            style={{
              shadowColor: "white",
              backgroundColor: "white",
            }}
          >
            <View className="mx-4 overflow-hidden rounded-full">
              <Image
                source={require("../../../assets/bank.png")}
                className="w-8 h-8"
              />
            </View>
            <Text
              className={`border-l pl-2 border-[#a2a6b1] w-[75%] text-xs  text-black/80  `}
            >
              Save today, to Invest tomorrow.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default One;
