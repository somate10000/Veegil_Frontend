import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

const Transfer = () => {
  return (
    <SafeAreaView className={`pt-8  h-full px-4`}>
      <StatusBar translucent animated />
      <View className="h-16  border-b-[1px] border-gray-500 items-center justify-center   ">
        <Text className="text-xl ">Transfers</Text>
      </View>
      <TouchableOpacity
        className="items-center justify-center "
        onPress={() => navigation.navigate("qrcodeAmt")}
      >
        <View className="flex-row items-center justify-between w-full mt-4 ">
          <View>
            <Text className="text-[15px]">Send to Quick Pay Users</Text>
            <Text className="text-gray-500 ">
              Scan and send using Quick Pay QR Code.
            </Text>
          </View>
          <MaterialCommunityIcons name="flash" size={35} color={"black"} />
        </View>
        <View className="w-32 h-[2px] mt-2 bg-black rounded-md" />
      </TouchableOpacity>
      <Link href={"/transferNGNBanks"} asChild>
        <TouchableOpacity className="items-center justify-center mt-2">
          <View className="flex-row items-center justify-between w-full mt-4">
            <View>
              <Text className="text-[15px]">Send to Bank Account</Text>
              <Text className="text-gray-500 ">Send to local NGN Banks.</Text>
            </View>
            <MaterialCommunityIcons name="bank" size={35} color={"black"} />
          </View>
          <View className="w-32 h-[2px] mt-2 bg-black rounded-md " />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default Transfer;
