import React from "react";
import {
  View,
  Text,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../../components/Header";
import { router } from "expo-router";

const Qrcode = () => {
  return (
    <SafeAreaView
      className={`pt-10  h-full  px-3`}
      style={{ backgroundColor: "white" }}
    >
      <StatusBar translucent animated />
      <View className="h-[100vh] w-full  ">
        <Header />

        <View className="items-center justify-center w-full mt-4 ">
          <View className="items-center justify-center ">
            {/* <Image
              source={require("../../../assets/qr.png")}
              style={{ height: 320, width: 330 }}
            /> */}
            <MaterialCommunityIcons name="qrcode" size={270} />
          </View>
          <Text className="mt-3 text-2xl font-bold">Scan to Pay</Text>
        </View>
        <View>
          <Text className="my-3 text-sm">
            Scan QR-Code to use the power of Quick Pay.
          </Text>
          <TouchableOpacity onPress={() => router.push("profile")}>
            <Text className="underline text-[13px] ">See Account Details</Text>
          </TouchableOpacity>
          <Text className="underline text-[13px] mt-3">
            Create Payment Link
          </Text>
          <TouchableOpacity className="mt-3">
            <Text className="underline text-[13px] ">
              Recieve money with Temporary Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Qrcode;
