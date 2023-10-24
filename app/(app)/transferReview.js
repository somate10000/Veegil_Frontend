import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { DotIndicator } from "react-native-indicators";
import * as LocalAuthentication from "expo-local-authentication";

import Pin from "../../components/Pin";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTransfer } from "../../hooks/useTransfer";

const TransferReview = () => {
  const { state } = useAuthContext();
  const usersData = JSON.parse(state.usersData);
  const { update, isLoading } = useUpdateUser();
  const { bankCode, bankName, amount, benfName, benfAcc, name, narration } =
    useLocalSearchParams();
  const { transfer, transfererror, transferisLoading, data } = useTransfer();

  const [open, setOpen] = useState();
  const [key, setKey] = useState(false);
  const [door, setDoor] = useState(false);

  const savedBiometrics = LocalAuthentication.isEnrolledAsync();

  useEffect(() => {
    if (key) {
      update(usersData?.acc_email, Number(usersData?.amount) - Number(amount));
      transfer().then(() => [setDoor(!door), console.log("good")]);
    }
  }, [key]);

  var fee = 20;
  console.log(benfName, name, bankCode);
  if (transferisLoading) {
    return (
      <View
        className="absolute items-center justify-center w-full h-full"
        style={{
          backgroundColor: "white",
        }}
      >
        <DotIndicator color={"black"} />
        <Text className="my-5 text-xl ">Processing your Request</Text>
      </View>
    );
  }

  if (door) {
    console.log("DOOR", door);
    return (
      <SafeAreaView
        className={
          Platform.OS === "android"
            ? "h-full pt-20 px-4"
            : "justify-center h-full px-4"
        }
      >
        <View className="items-center justify-center w-full my-3 ">
          <Image
            source={require("../../assets/success.png")}
            className="w-20 h-20 rounded-full"
          />
          <Text className="my-5 text-2xl ">Transaction Successful</Text>
        </View>
        <View
          className="w-full p-2 py-4 bg-[#d8d8d8] border-2 border-green-200 rounded-xl"
          style={{
            backgroundColor: "#d8d8d8",
          }}
        >
          <View className="flex-row justify-between mb-5">
            <Text style={{ color: "grey" }} className="">
              Benificiary Name:
            </Text>
            <Text style={{ color: "black" }} className="">
              {data.full_name}
            </Text>
          </View>

          <View className="flex-row justify-between mb-5">
            <Text style={{ color: "grey" }} className="">
              Benificiary Bank:
            </Text>
            <Text style={{ color: "black" }} className="">
              {data.bank_name}
            </Text>
          </View>

          <View className="flex-row justify-between mb-5">
            <Text style={{ color: "grey" }} className="">
              Benificiary Account:
            </Text>
            <Text style={{ color: "black" }} className="">
              {data.account_number}
            </Text>
          </View>

          <View className="flex-row justify-between mb-5">
            <Text style={{ color: "grey" }} className="">
              Amount:
            </Text>
            <Text style={{ color: "black" }} className="">
              ₦ {data.amount}
            </Text>
          </View>
          <View className="flex-row justify-between mb-5">
            <Text style={{ color: "grey" }} className="">
              Created At:
            </Text>

            <Text style={{ color: "black" }} className="">
              {data.created_at}
            </Text>
          </View>

          <View className="flex-row justify-between mb-5">
            <Text style={{ color: "grey" }} className="">
              Narration:
            </Text>
            <Text style={{ color: "black" }} className="">
              {data.narration}
            </Text>
          </View>

          <View className="flex-row justify-between mb-5">
            <Text style={{ color: "grey" }} className="">
              Reference:
            </Text>

            <Text style={{ color: "black" }} className="">
              {data.reference}
            </Text>
          </View>
          <View className="flex-row justify-between ">
            <Text style={{ color: "grey" }} className="">
              Status:
            </Text>
            <Text style={{ color: "black" }} className="">
              Success
            </Text>
          </View>
        </View>
        <TouchableOpacity className="items-center justify-center w-full mt-5 ">
          <View className="p-4 border border-gray-400 rounded-full">
            <MaterialIcons name="share" color={"green"} size={25} />
          </View>
          <Text className="mt-1 ">Share</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`pt-8  h-full px-4`}>
      <StatusBar translucent animated />
      <View>
        <View className="flex-row justify-between pt-2">
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={25} color={"white"} />
          </TouchableOpacity>
          <Text className="mt-4 text-xl ">Review Transaction</Text>
          <View />
        </View>
        <View className="h-full pt-24 ">
          <View className="w-full  rounded-2xl h-[37%]">
            <View className="flex-row justify-between border-b border-gray-300">
              <Text className="">Name :</Text>
              <View className="w-[76%] items-end">
                <Text className="">{name}</Text>
              </View>
            </View>
            <View className="flex-row justify-between mt-4 border-b border-gray-300">
              <Text className="">Bank :</Text>
              <Text className="">{bankName}</Text>
            </View>

            <View className="flex-row justify-between mt-4 border-b border-gray-300">
              <Text className="">Account :</Text>
              <Text className="">{benfAcc}</Text>
            </View>
            <View className="flex-row justify-between mt-4 border-b border-gray-300">
              <Text className="">Amount :</Text>
              <Text className="">₦ {amount}.00</Text>
            </View>
            <View className="flex-row justify-between mt-4 border-b border-gray-300">
              <Text className="">Fee : </Text>
              <Text className="">₦ {fee}.00</Text>
            </View>
            <View className="flex-row justify-between mt-4 border-b border-gray-300">
              <Text className="">Total : </Text>
              <Text className="">₦ {Number(amount) + fee}.00</Text>
            </View>
            <View className="flex-row justify-between mt-4 ">
              <Text className="">Narration : </Text>
              <Text className="">{narration}</Text>
            </View>
          </View>
          <View className="flex-row mt-10">
            <TouchableOpacity
              onPress={() => [
                savedBiometrics
                  ? [
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
                      LocalAuthentication.authenticateAsync({
                        promptMessage: "Verify Identity",
                        disableDeviceFallback: true,
                        cancelLabel: "cancel",
                        fallbackLabel: "Ego",
                      }).then((go) => setKey(go.success)),
                    ]
                  : alert("Try using Pin"),
              ]}
              className="w-[17%] rounded-md h-16 items-center justify-center border border-[#727781]  bg-[#1c1c1c]  mt-5 mr-3"
            >
              <MaterialIcons name="fingerprint" size={40} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [setKey(false), setOpen(!open)]}
              className="w-[78%] rounded-md h-16 items-center justify-center  mt-5 bg-black border border-blue-200"
            >
              <Text className="" style={{ color: "white" }}>
                Confirm Payment with Pin
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {open && !key
        ? [
            <Pin setKey={setKey} />,
            <View className="absolute px-4 mt-12">
              <TouchableOpacity onPress={() => setOpen(!open)}>
                <MaterialIcons name="close" size={29} color={"black"} />
              </TouchableOpacity>
            </View>,
          ]
        : null}
    </SafeAreaView>
  );
};

export default TransferReview;
