import { TouchableOpacity, Text, View, Image } from "react-native";

import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";

const Buttons = (props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => router.push(props.onPress)}
        className={`w-[52px]   rounded-[12px]  items-center shadow  justify-center p-2 h-[52px] mt-5 border border-[#484b53]  `}
        style={{
          shadowColor: "#3e4869",
          backgroundColor: "rgba(0,0,0,1)",
        }}
      >
        {props.id === 1 && (
          <Ionicons name="qr-code" color="#EDEADE" size={28} />
        )}
        {props.id === "2" && (
          <MaterialCommunityIcons
            name="gamepad-circle-outline"
            color="#EDEADE"
            size={28}
          />
        )}
        {props.id === 3 && (
          <MaterialIcons name="history-edu" color="#EDEADE" size={28} />
        )}
        {props.id === 4 && (
          <FontAwesome name="bank" color="#EDEADE" size={28} />
        )}
        {props.id === 5 && (
          <FontAwesome name="send" color="#EDEADE" size={28} />
        )}
      </TouchableOpacity>
      <View className="w-full">
        <Text className={`text-center mt-1 text-xs ${"   text-black/80  "}`}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default Buttons;
