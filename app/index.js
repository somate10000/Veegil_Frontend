import { useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { useRouter, useSegments, useRootNavigationState } from "expo-router";

import { useAuthContext } from "../hooks/useAuthContext";

const Index = () => {
  const router = useRouter();
  const segements = useSegments();
  const { state } = useAuthContext();
  const navigationState = useRootNavigationState();
  console.log("HOME: ", state);

  useEffect(() => {
    console.log(state);
    if (!navigationState?.key) return;

    if (state.isLoading) {
      console.log("still loading");
    } else if (!state.isLoading && state.usersData) {
      const inAuthGroup = segements[0] === "(auth)";

      if ((state.userToken === null, state.usersData === "" && !inAuthGroup)) {
        router.replace("/login");
      } else if (state.userToken && state.usersData) {
        router.replace("/(app)/(tabs)/home");
      }
    }
  }, [state, segements, navigationState?.key]);
  return (
    <View>
      {!navigationState?.key ? (
        <Text>LOADING....</Text>
      ) : (
        <View className="items-center justify-center h-full">
          <ActivityIndicator size={30} color={"black"} />
        </View>
      )}
    </View>
  );
};

export default Index;
