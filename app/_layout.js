import { Slot } from "expo-router";
import AuthProvider from "../context/AuthContext";

export default function Root() {
  console.log("ehwdywhi");
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
