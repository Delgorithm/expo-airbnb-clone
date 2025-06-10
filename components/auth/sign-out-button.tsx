import { useClerk } from "@clerk/clerk-expo";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.error("Sign-out failed", err);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSignOut}
      style={{
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        borderRadius: 6,
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 18,
          fontWeight: 500,
        }}
      >
        Se déconnecter
      </Text>
    </TouchableOpacity>
  );
};
