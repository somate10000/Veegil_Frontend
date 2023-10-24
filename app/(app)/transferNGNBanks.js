import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  VirtualizedList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import { useGetAllBanks } from "../../hooks/useGetNGNBanks";

const toastConfig = {
  tomatoToast: ({ text1, text2 }) => {
    return (
      <View
        style={{
          backgroundColor: "#f5f5f5",
        }}
        className="w-[90%] h-16 rounded-md border-2 border-gray-800 px-5 flex-row items-center justify-between"
      >
        <View>
          <Text className="text-lg text-red-600 ">{text1}</Text>
          <Text className="">{text2}</Text>
        </View>
        <Entypo name="info" color={"red"} size={20} />
      </View>
    );
  },
};

const showToast = () => {
  Toast.show({
    type: "tomatoToast",
    text1: "Note",
    text2: "All Fields Must be completed ",
  });
};

const TransferNGNBanks = ({ navigation }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [bankId, setBankId] = useState("");
  const [modal, setModal] = useState(false);
  const [benfAcc, setBenfAcc] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [narration, setNarration] = useState("");
  const { error, isLoading, data, benfName, endpoint, nuban } =
    useGetAllBanks();

  const banks = useMemo(() => {
    return data ? [...data].sort((a, b) => a.name.localeCompare(b.name)) : null;
  }, [data]);

  useEffect(() => {
    if (benfName) {
      setName(benfName);
    }
  }, [benfName]);

  return (
    <SafeAreaView className={`pt-8  h-full px-4`}>
      <StatusBar translucent animated />
      <View>
        <View className="pt-6 ">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios" size={24} />
            </TouchableOpacity>
            <Text className="text-2xl ">Send Money</Text>
            <View />
          </View>
        </View>

        <View className="z-0 mt-10">
          <Text className="mb-2 ">Recipient's details</Text>
          <View>
            <TouchableOpacity
              disabled={isLoading}
              onPress={() => [
                !data ? endpoint() : console.log("Wuhaz", data),
                setModal(true),
                console.log("Wuha"),
              ]}
              className={`h-16  justify-between  mb-7 text-base border items-center flex-row rounded  ${"bg-[#eeeeee]  border-zinc-300"}`}
            >
              {!bankName ? (
                <Text className=" text-[#757575] ml-3 ">Select Bank</Text>
              ) : (
                <Text className="ml-3 " style={{ color: "black" }}>
                  {bankName}
                </Text>
              )}

              {isLoading && (
                <ActivityIndicator
                  size="large"
                  className="-ml-10"
                  color={"grey"}
                />
              )}

              <MaterialIcons
                name="arrow-drop-down"
                style={{
                  marginRight: 15,
                  backgroundColor: "white",
                  borderRadius: 18,
                }}
                size={28}
                color={"#5f5e5e"}
              />
            </TouchableOpacity>
            {data && modal ? (
              <View className="z-50 w-full h-[65%] -mt-5 ">
                <View
                  className={`h-14 mb-1  px-3  text-base border items-center flex-row rounded   ${"bg-[#eeeeee]  border-zinc-300"}`}
                >
                  <MaterialIcons name="search" size={28} color={"#7f5539"} />
                  <TextInput
                    maxLength={10}
                    placeholder="Search Bank Name"
                    placeholderTextColor={"#757575"}
                    className="px-3 w-full  h-[100%] text-white"
                  />
                </View>
                <VirtualizedList
                  data={banks}
                  keyExtractor={(item) => item.id}
                  getItemCount={() => banks.length}
                  initialNumToRender={10}
                  getItem={(data, index) => data[index]}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={{
                          borderColor: "white",
                          backgroundColor: "rgb(209 213 219)",
                        }}
                        className="justify-center px-3 bg-gray-300 border-2 h-14"
                        onPress={() => [
                          setModal(false),
                          setBankName(item.name),
                          setBankId(item.id),
                          setBankCode(item.code),
                        ]}
                      >
                        <Text className=" text-sm text-[#5f5e5e]">
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            ) : null}
          </View>

          <View
            className={`h-16 px-3 mb-7 text-base border rounded   ${"bg-[#eeeeee] border-zinc-300"}`}
          >
            <TextInput
              maxLength={10}
              placeholder="Account Number"
              placeholderTextColor={"#757575"}
              inputMode="numeric"
              value={benfAcc}
              onChangeText={(text) => [
                setBenfAcc(text),
                console.log(text, benfAcc),
                text.length >= 9 ? nuban(bankCode, text) : null,
              ]}
              className="w-[90%]   h-full "
              style={{ color: "black" }}
            />

            <Text className="my-2 -ml-3 text-xs ">{name}</Text>
          </View>
          <View
            className={`h-16 px-3  mb-7 text-base border items-center flex-row rounded  ${"bg-[#eeeeee]  border-zinc-300"}`}
          >
            <Text className="text-base " style={{ color: "black" }}>
              ₦{" "}
            </Text>
            <TextInput
              placeholder="Amount"
              placeholderTextColor={"#757575"}
              inputMode="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
              className="w-[90%]  h-full  text-[16px] "
              style={{ color: "black" }}
            />
          </View>
          <View
            className={`h-16 px-3 mb-7  border items-center flex-row rounded   ${"bg-[#eeeeee]  border-zinc-300"}`}
          >
            <TextInput
              placeholder="Narration"
              placeholderTextColor={"#757575"}
              inputMode="text"
              value={narration}
              onChangeText={(text) => setNarration(text)}
              className="w-[90%]  h-full "
              style={{ color: "black" }}
            />
          </View>
          <TouchableOpacity
            className={`h-16 px-3 mb-7  border items-center  justify-between flex-row rounded  ${"bg-[#eeeeee]  border-zinc-300"}`}
          >
            <Text className="   text-[#757575] ">Select a Beneficiary</Text>
            <MaterialIcons name="person" color={"grey"} size={28} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              !amount || !bankCode || !bankId || !benfAcc || !name //|| !bankName
                ? showToast()
                : [
                    router.push({
                      pathname: "transferReview",
                      params: {
                        bankCode,
                        bankName,
                        bankId,
                        amount,
                        narration,
                        benfAcc,
                        name,
                      },
                    }),
                    setAmount(""),
                    setBankCode(""),
                    setBankId(""),
                    setBankName(""),
                    setBenfAcc(""),
                    setNarration(""),
                    setName(""),
                  ]
            }
            className="items-center justify-center w-full bg-black rounded-md h-14"
          >
            <Text className="" style={{ color: "white" }}>
              Send Money
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default TransferNGNBanks;
