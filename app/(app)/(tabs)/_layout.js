import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
const Layout = () => {
  const color = "pink";
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          borderTopColor: "white",
          backgroundColor: "white",
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? "black" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="qrcode"
        options={{
          tabBarLabel: "qrcode",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="qr-code"
              size={size}
              color={focused ? "black" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          tabBarLabel: "Transfer",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <FontAwesome
              name="send-o"
              size={size}
              color={focused ? "black" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="card"
        options={{
          tabBarLabel: "Card",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="card"
              size={size}
              color={focused ? "black" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "settings",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="settings-sharp"
              size={size}
              color={focused ? "black" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
