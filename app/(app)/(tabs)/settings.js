import { View, Text, Button } from "react-native";
import React from "react";
import { useSignout } from "../../../hooks/useSignout";
import { router } from "expo-router";

const Settings = () => {
  const { signout } = useSignout();
  return (
    <View className="items-center justify-center h-full">
      <Button
        title="SignOut"
        onPress={() => [router.replace("/(auth)/login"), signout()]}
        color={"black"}
      />
    </View>
  );
};

export default Settings;
