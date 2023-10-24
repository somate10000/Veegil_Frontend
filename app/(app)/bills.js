import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Platform,
  StatusBar,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";

const Img = [
  {
    name: "MTN",
    img: require("../../assets/Mtn.png"),
    biller_code: "BIL099",
    type: "AIRTIME",
  },
  {
    name: "GLO",
    img: require("../../assets/Glo.jpg"),
    biller_code: "BIL102",
    type: "GLO VTU",
  },
  {
    name: "AIRTEL",
    img: require("../../assets/Airtel.jpg"),
    biller_code: "BIL100",
    type: "AIRTEL VTU",
  },
  {
    name: "9MOBILE",
    img: require("../../assets/9mobile.png"),
    biller_code: "BIL103",
    type: "9MOBILE VTU",
  },
];
const Cable = [
  { name: "DSTV", img: require("../../assets/dstv.jpg") },
  { name: "GOTV", img: require("../../assets/gotv.png") },
  { name: "STARTIMES", img: require("../../assets/Startimes.jpg") },
];

const Buttons = ({ Text1, Text2, color, setModal, icon }) => {
  return (
    <TouchableOpacity className="mb-3" onPress={() => setModal(Text1)}>
      <View className="flex-row items-center w-full h-16">
        <View className="items-center justify-center h-full w-[10%]">
          <Entypo name={icon} color={color} size={24} />
        </View>
        <View className="flex-row  justify-between w-[90%] items-center pl-2">
          <View>
            <Text className="text-[17px] ">{Text1}</Text>
            <Text className="text-sm text-gray-400 ">{Text2}</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const UtilisModal = ({ modal, setModal }) => {
  return (
    <View>
      {modal === "Mobile Top Up" && (
        <MobileTopUp setModal={setModal} modal={modal} />
      )}
      {modal === "Data Purchase" && (
        <DataPurchase setModal={setModal} modal={modal} />
      )}
      {modal === "Cable Tv" && <CableTv setModal={setModal} modal={modal} />}
      {modal === "Electricity" && (
        <Electricity setModal={setModal} modal={modal} />
      )}
      <Button title="close" onPress={() => setModal(false)} />
    </View>
  );
};

const height = StatusBar.currentHeight;

const Utils = ({ navigation }) => {
  const [modal, setModal] = useState(false);

  return (
    <SafeAreaView className={` h-full w-full`}>
      <StatusBar translucent animated />

      <View className="w-full h-full px-4 pt-14">
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={25} />
          </TouchableOpacity>
          <Text className="text-xl ">Pay Bills</Text>
          <View className="w-10 h-10 rounded-full" />
        </View>

        <View className="mt-5">
          <Buttons
            Text1="Data Purchase"
            Text2="Recharge your mobile phone"
            icon="old-phone"
            color="#F75E25"
            setModal={setModal}
          />
          <Buttons
            Text1="Cable Tv"
            Text2="Subscribe for your TV Access"
            icon="tv"
            color="#4C9141"
            setModal={setModal}
          />
          <Buttons
            Text1="Electricity"
            Text2="Subscribe to your Electricity Provider"
            icon="flash"
            color="#282828"
            setModal={setModal}
          />
          <Buttons
            Text1="Mobile Top Up"
            Text2="Top Up Airtime balance"
            icon="phone"
            color="#6A5F31"
            setModal={setModal}
          />
          <Buttons
            Text1="Education"
            Text2="Top Up Airtime balance"
            icon="open-book"
            color="#434B4D"
            setModal={setModal}
          />
          <Buttons
            Text1="Remita"
            Text2="Make Remita Payments"
            icon="air" //aircraft-take-off
            color="#f9C9A8"
            setModal={setModal}
          />
        </View>
      </View>
      {modal && (
        <View
          className={`absolute w-full h-full ${
            Platform.OS === "android" ? `pt-[${height}px]` : ""
          }`}
        >
          <UtilisModal
            modal={modal}
            setModal={setModal}
            navigation={navigation}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Utils;

const MobileTopUp = ({ setModal, modal }) => {
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  return (
    <View className="h-full bg-white">
      <StatusBar backgroundColor="rgba(0,0,0,0.8)" animated />
      <View
        className={`px-4 pt-6 border-t-[2px] border-t-indigo-400`}
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="flex-row items-center w-[65%] justify-between ">
          <TouchableOpacity
            className="items-center justify-center w-10 h-10"
            onPress={() => setModal(false)}
          >
            <Ionicons name="ios-close" size={25} />
          </TouchableOpacity>
          <Text className="text-xl text-center">{modal}</Text>
        </View>
      </View>
      <View className="px-5 pt-6">
        <Text className="text-gray-400 ">Select Network Provider</Text>
        <View className="flex-row justify-between mt-1">
          {Img.map((img, i) => {
            return (
              <View key={i} className="items-center ">
                <TouchableOpacity
                  onPress={() => [console.log(img), setType(img.type)]}
                  className=" items-center justify-center w-[70px] pt-2 rounded-2xl  shadow shadow-blue-500"
                  style={{
                    backgroundColor: type === img.type ? "#b08968" : "#f5f5f5",
                  }}
                >
                  <Image source={img.img} className="w-14 h-14 rounded-2xl" />
                  <Text className="m-2 text-xs text-gray-400">{img.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <Image />
        <View className="mt-8">
          <Text className="self-end text-gray-400">
            No Beneficiary available
          </Text>
          <View
            className="flex-row items-center h-16 px-3 text-base border rounded "
            style={{
              backgroundColor: "white",
              borderColor: "rgb(156, 163,175)",
            }}
          >
            <TextInput
              // keyboardType="number-pad"
              maxLength={11}
              placeholder="Mobile Number"
              placeholderTextColor={"rgb(156, 163,175)"}
              inlineImageLeft={"../../assets/Mtn.png"}
              inputMode="numeric"
              onChangeText={(text) => setCustomer(text)}
              className="w-[90%] text-base  h-full text-gray-800 "
            />
            <MaterialIcons name="contact-phone" size={24} color="black" />
          </View>
          <View className="flex-row flex-wrap justify-between mt-6">
            <TouchableOpacity
              onPress={() => setAmount("100")}
              className="items-center justify-center  w-[48%] mb-4 rounded-md shadow-md h-14 "
              style={{
                backgroundColor: "#f5f5f5",
                borderColor: "rgb(156, 163,175)",
              }}
            >
              <Text className="text-base text-gray-500 ">₦ 100.00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmount("200")}
              className="items-center justify-center w-[48%] mb-4 rounded-md shadow-md h-14 "
              style={{
                backgroundColor: "#f5f5f5",
                borderColor: "rgb(156, 163,175)",
              }}
            >
              <Text className="text-base text-gray-500 ">₦ 200.00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmount("500")}
              className="items-center justify-center w-[48%]  rounded-md shadow-md h-14"
              style={{
                backgroundColor: "#f5f5f5",
                borderColor: "rgb(156, 163,175)",
              }}
            >
              <Text className="text-base text-gray-500 ">₦ 500.00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmount("1000")}
              className="items-center justify-center w-[48%] rounded-md shadow-md h-14"
              style={{
                backgroundColor: "#f5f5f5",
                borderColor: "rgb(156, 163,175)",
              }}
            >
              <Text className="text-base text-gray-500 ">₦ 1000.00</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            keyboardType="number-pad"
            maxLength={11}
            placeholder="₦ Amount"
            placeholderTextColor={"rgb(156, 163,175)"}
            onChangeText={(text) => setAmount(text)}
            value={amount}
            className="h-16 px-3 mt-8 text-base text-gray-800 border rounded"
            style={{
              backgroundColor: "white",
              borderColor: "rgb(156, 163,175)",
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => [
            endpoint(customer, amount, type),
            setCustomer(""),
            setAmount(""),
            setType(""),
          ]}
          className="items-center justify-center w-full mt-5 bg-black rounded-md h-14"
        >
          <Text className="" style={{ color: "white" }}>
            Buy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DataPurchase = ({ setModal, modal }) => {
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  return (
    <View className="h-full bg-white">
      <StatusBar backgroundColor="rgba(0,0,0,0.8)" animated />
      <View
        className="px-4 pt-6 border-t-[2px] border-t-indigo-400"
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="flex-row items-center w-[65%] justify-between ">
          <TouchableOpacity
            className="items-center justify-center w-10 h-10"
            onPress={() => setModal(false)}
          >
            <Ionicons name="ios-close" size={25} />
          </TouchableOpacity>
          <Text
            className="text-xl text-center"
            //style={{ color: colors.text }}
          >
            {modal}
          </Text>
        </View>
      </View>
      <View className="px-5 pt-6">
        <Text className="text-gray-400 ">Select Network Provider</Text>
        <View className="flex-row justify-between mt-1">
          {Img.map((img, i) => {
            return (
              <View key={i} className="items-center ">
                <TouchableOpacity
                  onPress={() => [console.log(img), setName(img.name)]}
                  className=" items-center justify-center w-[70px] pt-2 rounded-2xl  shadow shadow-blue-500"
                  style={{
                    backgroundColor: name === img.name ? "#b08968" : "#f5f5f5",
                  }}
                >
                  <Image source={img.img} className="w-14 h-14 rounded-2xl" />
                  <Text className="m-2 text-xs text-gray-400">{img.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <Image />
        <TouchableOpacity
          className="flex-row items-center justify-between h-16 px-3 mt-8 text-base border rounded "
          style={{
            backgroundColor: "white",
            borderColor: "rgb(156, 163,175)",
          }}
        >
          {!type ? (
            <Text className="text-gray-400 ">
              Select available data products
            </Text>
          ) : (
            <Text className="text-gray-500 ">{type}</Text>
          )}

          <MaterialIcons name="keyboard-arrow-down" size={28} color="grey" />
        </TouchableOpacity>

        <View className="mt-8">
          <Text className="self-end text-gray-400">
            No Beneficiary available
          </Text>
          <View
            className="flex-row items-center h-16 px-3 text-base border rounded "
            style={{
              backgroundColor: "white",
              borderColor: "rgb(156, 163,175)",
            }}
          >
            <TextInput
              maxLength={11}
              placeholder="Mobile Number"
              placeholderTextColor={"rgb(156, 163,175)"}
              inlineImageLeft={"../../assets/Mtn.png"}
              inputMode="numeric"
              value={customer}
              onChangeText={(text) => setCustomer(text)}
              className="w-[90%] text-base  h-full text-gray-800 "
            />
            <MaterialIcons name="contact-phone" size={24} color="#131142" />
          </View>

          <View
            className="justify-center h-16 px-3 mt-8 text-base text-gray-500 border rounded"
            style={{
              backgroundColor: "white",
              borderColor: "rgb(156, 163,175)",
            }}
          >
            {!type ? (
              <Text className="text-base text-gray-400">₦ Amount</Text>
            ) : (
              <Text className="text-gray-800 ">₦ {amount}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => [
            endpoint(customer, amount, type),
            setCustomer(""),
            setAmount(""),
            setType(""),
          ]}
          className="items-center justify-center w-full mt-5 bg-black rounded-md h-14"
        >
          <Text className="" style={{ color: "white" }}>
            Buy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CableTv = ({ setModal, modal }) => {
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  return (
    <View className="h-full bg-white">
      <StatusBar backgroundColor="rgba(0,0,0,0.8)" animated />
      <View
        className="px-4 pt-8 border-t-[2px] border-t-indigo-400"
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="flex-row items-center w-[65%] justify-between ">
          <TouchableOpacity
            className="items-center justify-center w-10 h-10"
            onPress={() => setModal(false)}
          >
            <Ionicons name="ios-close" size={25} />
          </TouchableOpacity>
          <Text
            className="text-xl text-center"
            //style={{ color: colors.text }}
          >
            {modal}
          </Text>
        </View>
      </View>
      <View className="px-5 pt-8">
        <Text className="text-gray-400 ">Select Cable Provider</Text>
        <View className="flex-row mt-1">
          {Cable.map((img, i) => {
            return (
              <View key={i} className="items-center mr-3">
                <TouchableOpacity
                  onPress={() => [console.log(img), setName(img.name)]}
                  className=" items-center justify-center w-[90px] pt-2 rounded-2xl shadow shadow-blue-500"
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderColor: "rgb(156, 163,175)",
                  }}
                >
                  <Image
                    source={img.img}
                    resizeMode="contain"
                    className=" w-14 h-14 rounded-2xl"
                  />
                  <Text className="m-2 text-xs text-gray-400">{img.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          className="flex-row items-center justify-between h-16 px-3 mt-8 text-base border rounded"
          style={{
            backgroundColor: "#f5f5f5",
            borderColor: "rgb(156, 163,175)",
          }}
        >
          {!type ? (
            <Text className="text-gray-400 ">Select Package</Text>
          ) : (
            <Text className="text-gray-800 ">{type}</Text>
          )}

          <MaterialIcons
            name="keyboard-arrow-down"
            size={28}
            color="rgb(156, 163,175)"
          />
        </TouchableOpacity>

        <View className="mt-8">
          <View
            className="flex-row items-center h-16 px-3 text-base border rounded "
            style={{
              backgroundColor: "#f5f5f5",
              borderColor: "rgb(156, 163,175)",
            }}
          >
            <TextInput
              maxLength={11}
              placeholder="Smart Card Number"
              placeholderTextColor={"rgba(156,163,175,1)"}
              inlineImageLeft={"../../assets/Mtn.png"}
              inputMode="numeric"
              className="w-[90%]  h-full text-gray-800"
              onChangeText={(text) => setCustomer(text)}
              value={amount}
            />
          </View>
        </View>
        <TouchableOpacity className="items-center justify-center w-full mt-8 bg-black rounded-md h-14">
          <Text className="" style={{ color: "white" }}>
            Pay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Electricity = ({ setModal, modal }) => {
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  return (
    <View className="h-full bg-white">
      <StatusBar backgroundColor="rgba(0,0,0,0.8)" animated />
      <View
        className="px-4 pt-8 border-t-[2px] border-t-indigo-400"
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="flex-row items-center w-[65%] justify-between ">
          <TouchableOpacity
            className="items-center justify-center w-10 h-10"
            onPress={() => setModal(false)}
          >
            <Ionicons name="ios-close" size={25} />
          </TouchableOpacity>
          <Text
            className="text-xl text-center"
            //style={{ color: colors.text }}
          >
            {modal}
          </Text>
        </View>
      </View>
      <View className="px-5 pt-8">
        <Text className="text-gray-400 ">Select Electricity Provider</Text>

        <TouchableOpacity
          onPress={() => [
            !data ? endpointPackages("power") : console.log("Wuhaz"),
            setModalPackages(true),
            console.log("Wuha"),
          ]}
          className="flex-row items-center justify-between h-16 px-3 mt-8 text-base border rounded"
          style={{
            backgroundColor: "#f5f5f5",
            borderColor: "rgb(156, 163,175)",
          }}
        >
          {!type ? (
            <Text className="text-gray-400 ">Select Package</Text>
          ) : (
            <Text className="text-gray-800 ">{type}</Text>
          )}
          <MaterialIcons
            name="keyboard-arrow-down"
            size={28}
            color="rgb(156, 163,175)"
          />
        </TouchableOpacity>

        <View className="mt-8">
          <View
            className="flex-row items-center h-16 px-3 text-base border rounded "
            style={{
              backgroundColor: "#f5f5f5",
              borderColor: "rgb(156, 163,175)",
            }}
          >
            <TextInput
              maxLength={11}
              placeholder="Smart Card Number"
              placeholderTextColor={"rgba(156,163,175,1)"}
              inlineImageLeft={"../../assets/Mtn.png"}
              inputMode="numeric"
              className="w-[90%]  h-full text-gray-800"
              onChangeText={(text) => setCustomer(text)}
              value={amount}
            />
          </View>
        </View>
        <TouchableOpacity className="items-center justify-center w-full mt-8 bg-black rounded-md h-14">
          <Text className="" style={{ color: "white" }}>
            Pay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
