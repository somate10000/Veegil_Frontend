import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Numberpad from "../components/NumberPad";

const Pin = ({ setKey }) => {
  const [value, setValue] = useState("");

  return (
    <View className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center bg-white ">
      <Text className="text-2xl">Enter Transaction Pin</Text>
      <View className="flex-row mt-5">
        {value.slice(0, 4).length > 0 ? (
          <View
            key={0}
            className="w-8 h-8 mx-2 bg-black border-2 border-gray-600 rounded-3xl "
          />
        ) : (
          <View
            key={1}
            className="w-8 h-8 mx-2 border-2 border-gray-600 rounded-xl"
          />
        )}
        {value.slice(0, 4).length > 1 ? (
          <View
            key={2}
            className="w-8 h-8 mx-2 bg-black border-2 border-gray-600 rounded-3xl "
          />
        ) : (
          <View
            key={3}
            className="w-8 h-8 mx-2 border-2 border-gray-600 rounded-xl"
          />
        )}
        {value.slice(0, 4).length > 2 ? (
          <View
            key={4}
            className="w-8 h-8 mx-2 bg-black border-2 border-gray-600 rounded-3xl "
          />
        ) : (
          <View
            key={5}
            className="w-8 h-8 mx-2 border-2 border-gray-600 rounded-xl"
          />
        )}
        {value.slice(0, 4).length > 3 ? (
          <View
            key={6}
            className="w-8 h-8 mx-2 bg-black border-2 border-gray-600 rounded-full "
          />
        ) : (
          <View
            key={7}
            className="w-8 h-8 mx-2 border-2 border-gray-600 rounded-xl"
          />
        )}
        {console.log("vale:", value.slice(0, 4))}
      </View>

      <View className="items-center justify-center w-full mt-8 ">
        <Numberpad value={value} setValue={setValue} number={4} />
        <TouchableOpacity
          onPress={
            setKey ? () => (value === "1709" ? setKey(true) : null) : null
          }
          className="items-center justify-center w-1/2 mt-4 bg-black rounded-md h-14 "
        >
          <Text className="font-[PoppinsM]" style={{ color: "white" }}>
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};

import Toast, { BaseToast } from "react-native-toast-message";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "white" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  tomatoToast: ({ text1, text2 }) => (
    <View className="w-[90%] h-16 bg-white rounded-md border-2 border-white px-5 flex-row items-center justify-between">
      <View>
        <Text className="text-lg font-bold text-red-600 ">{text1}</Text>
        <Text className="text-black">{text2}</Text>
      </View>
      <Entypo name="warning" color={"red"} size={20} />
    </View>
  ),
};

const showToast = () => {
  Toast.show({
    type: "tomatoToast",
    text1: "Alert",
    text2: "Biometric record not found ",
  });
  // Toast.show({
  //   type: "success",
  //   text1: "Hello",
  //   text2: "This is some something 👋",
  // });
};

//bg-[#ede0d4]

export default Pin;
