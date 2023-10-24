import React from "react";
import { Text } from "react-native";
import { useAuthContext } from "../hooks/useAuthContext";

const Protocol = () => {
  const { state } = useAuthContext();
  const usersData = state.usersData ? JSON.parse(state.usersData) : null;
  let number;
  const amount = String(usersData?.amount);

  if (amount?.length === 4) {
    number = amount?.substring(0, 1) + "," + amount?.substring(1);
  }
  if (amount?.length === 5) {
    number = amount?.substring(0, 2) + "," + amount?.substring(2);
  }

  if (amount?.length === 6) {
    number = amount?.substring(0, 3) + "," + amount?.substring(3);
  }
  if (amount?.length === 7) {
    number =
      amount?.substring(0, 1) +
      "," +
      amount?.substring(1, 4) +
      "," +
      amount?.substring(4);
  }
  if (amount?.length === 8) {
    number =
      amount?.substring(0, 2) +
      "," +
      amount?.substring(2, 5) +
      "," +
      amount?.substring(5);
  }
  if (amount?.length === 9) {
    number =
      amount?.substring(0, 3) +
      "," +
      amount?.substring(3, 6) +
      "," +
      amount?.substring(6);
  }
  if (amount?.length === 10) {
    number =
      amount?.substring(0, 1) +
      "," +
      amount?.substring(1, 4) +
      "," +
      amount?.substring(4, 7) +
      "," +
      amount?.substring(7);
  }

  if (amount?.length === 11) {
    number =
      amount?.substring(0, 2) +
      "," +
      amount?.substring(2, 5) +
      "," +
      amount?.substring(5, 8) +
      "," +
      amount?.substring(8);
  }
  if (amount?.length === 12) {
    number =
      amount?.substring(0, 3) +
      "," +
      amount?.substring(3, 6) +
      "," +
      amount?.substring(6, 9) +
      "," +
      amount?.substring(9);
  }
  if (amount?.length === 13) {
    number =
      amount?.substring(0, 1) +
      "," +
      amount?.substring(1, 4) +
      "," +
      amount?.substring(4, 7) +
      "," +
      amount?.substring(7, 10) +
      "," +
      amount?.substring(10);
  }
  if (amount?.length > 13) {
    number = amount;
  }
  return (
    <Text className="text-[26px]  mt-1 leading-none text-white ">
      ₦ {number || amount}.<Text className="text-xs leading-8 ">00</Text>
    </Text>
  );
};

export default Protocol;
