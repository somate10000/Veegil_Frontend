import React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;

const buttons = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  <Ionicons name="logo-amplify" size={30} color={"#2e2d31"} />,
  "0",
  <MaterialIcons name="backspace" size={24} />,
];

const Numberpad = ({ value, setValue, number }) => {
  //const { colors } = useTheme();
  return (
    <View className={`  px-2`}>
      <View className="flex-row flex-wrap justify-center">
        {buttons.map((item, index) => {
          return (
            <Pressable
              //style={{ borderColor: colors.border }}
              className={`items-center justify-center w-20  h-20 mx-4  my-5 ${"border-[#2e2d31] bg-[#ffffff]   "}  rounded-3xl border-2`}
              key={index}
              onPress={() =>
                index === 9
                  ? null
                  : index === 11
                  ? [
                      console.log(item, index),
                      setValue(
                        value.substring(0, value.slice(0, number).length - 1)
                      ),
                    ]
                  : [console.log(item, index), setValue(value + item)]
              }
              delayPressIn={0}
            >
              <Text className={` text-3xl font-bold `}>{item}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Numberpad;
