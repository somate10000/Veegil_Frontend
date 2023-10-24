import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAuthContext } from "../hooks/useAuthContext";
import { router } from "expo-router";

const Header = () => {
  const { state } = useAuthContext();
  //const [usersData, setUsersData] = useState(null);
  let data = state.usersData;
  const usersData = data ? JSON.parse(data) : null;
  const img = usersData?.imageUrl;

  //console.log(usersData);

  return (
    <View className="flex flex-row items-center justify-between h-20 ">
      <View>
        <Text className="text-[13px]">Welcome Back</Text>
        <View className="max-w-[215px]">
          <Text className="text-lg " lineBreakMode="tail" numberOfLines={1}>
            {usersData?.title} {usersData?.account_name}
          </Text>
          <View className="px-2">
            <LinearGradient
              start={{ x: 0.8, y: 0.5 }}
              end={{ x: 0, y: 0.8 }}
              colors={[`${"rgba(0,0,0,1)"}`, `${"#ffffff"}`, "rgba(0,0,0,1)"]}
              className="bg-[#b08968] h-[1.5px] "
            />
          </View>
        </View>
      </View>
      <View className="flex-row items-center gap-4">
        <TouchableOpacity className="bg-black p-[2px] rounded-full ">
          <AntDesign name="customerservice" size={18} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-black p-[2px] rounded-full">
          <Ionicons name="notifications" size={18} style={{ color: "white" }} />
          <View className="bg-[#c7361d] h-4 absolute ml-4   -mt-1  w-4 rounded-md items-center ">
            <Text className="  text-sm text-white -mt-[2px]">2</Text>
          </View>
        </TouchableOpacity>
        <TouchableHighlight
          onPress={() => router.push("profile")}
          className="rounded-full"
        >
          <LinearGradient
            end={{ x: 0.1, y: 0.3 }}
            locations={[0.1, 0.9]}
            colors={["rgba(0,0,0,1)", "#484b53"]}
            className="items-center justify-center h-[52px] w-[52px] rounded-[20px] shadow-2xl shadow-[#4926ac]"
          >
            <SharedElement id="index">
              <View className="overflow-hidden items-center justify-center  h-[49px] w-[49px] ">
                <Image
                  source={{ uri: img }}
                  // source={img}
                  className="w-12 h-12 rounded-[20px]"
                />
              </View>
            </SharedElement>
          </LinearGradient>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Header;
