import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useAuthContext } from "../../hooks/useAuthContext";

const ReuseableComponent = (props) => {
  return (
    <View>
      <Text className="text-gray-500">{props.title}</Text>
      <Text className="mt-3 text-[17px] ">{props.subject}</Text>
      <View className="bg-gray-500  h-[1px] my-3" />
    </View>
  );
};

const Profile = () => {
  const { state } = useAuthContext();
  const usersData = state.usersData ? JSON.parse(state.usersData) : null;

  // console.log(usersData);
  const img = usersData?.imageUrl;

  const [copiedText, setCopiedText] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("2001234567");

    alert("copied");
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };
  const scrollA = useRef(new Animated.Value(0)).current;
  const scrollB = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView className={`pt-0  h-full`}>
      <StatusBar translucent style="light" animated />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View className="relative border-b-2 border-[#7d7a86]">
          <View style={styles.bannerContainer}>
            <Animated.Image
              style={styles.banner(scrollA)}
              source={{ uri: img }}
            />
          </View>

          <View className="absolute z-50 flex-row justify-between w-full px-4">
            <Ionicons
              name="ios-arrow-back"
              color={"white"}
              size={30}
              style={{ marginTop: 40 }}
              onPress={() => router.back()}
            />
            <View className="shadow-2xl shadow-black/80">
              <TouchableOpacity onPress={pickImage}>
                <MaterialCommunityIcons
                  name="image-edit"
                  color={"white"}
                  size={30}
                  style={{ marginTop: 40 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            className={`items-end justify-end -mt-14 mb-[10px]  w-full px-4`}
          >
            <View className=" bg-black p-2 rounded-md border border-[#7d7a86]">
              <Text className="text-xl text-center text-white align-text-bottom ">
                {usersData?.title} {usersData?.account_name}
              </Text>
            </View>
          </View>
        </View>
        <View className="px-4 pt-4">
          <View
            className="flex-row items-center justify-between px-2 py-3 rounded-md border border-[#7d7a86]"
            style={{ backgroundColor: "black" }}
          >
            <Text className="text-base" style={{ color: "white" }}>
              Account Number:
            </Text>
            <TouchableOpacity
              onPress={copyToClipboard}
              className="flex-row items-center gap-2"
            >
              <Text className="text-xl " style={{ color: "white" }}>
                {usersData?.phoneNumber}
              </Text>
              <Ionicons name="md-copy" size={20} color={"white"} />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-end mt-[2px] mb-2">
            <Text>click to copy</Text>
          </View>

          <ReuseableComponent
            title="Handle"
            subject={`@${usersData?.account_name}13738`}
          />
          <ReuseableComponent
            title="Account Name"
            subject={usersData?.account_name}
          />

          <ReuseableComponent
            title="Address"
            subject="17 Diobu, Rumuola Port Harcourt."
          />
          <ReuseableComponent
            title="Phone"
            subject={`+234${usersData?.phoneNumber}`}
          />
          <ReuseableComponent title="E-mail" subject={usersData?.email} />
          <ReuseableComponent title="Martial Status" subject="Single" />
          <ReuseableComponent title="BVN" subject="Verified" />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const BANNER = 400;
const BAN = 380;
const styles = {
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: "center",
    overflow: "hidden",
  },
  banner: (scrollA) => ({
    height: BANNER,
    width: "120%",
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER + 100, 0, BANNER - 50, BANNER],
          outputRange: [-BANNER / 2, 0, BANNER * 0.75, BANNER - 35],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER, 100, BANNER + 240, BANNER + 241],
          outputRange: [1, 1, 0.65, 0.3],
        }),
      },
    ],
  }),
};

export default Profile;
