import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, Redirect, useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export default function SignInPage() {
  const { isSignedIn } = useAuth();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  const onSignInPress = async () => {
    if (!isLoaded) {
      console.log("Clerk not yet loaded");
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(
          "Further steps required:",
          JSON.stringify(signInAttempt, null, 2),
        );
      }
    } catch (err) {
      console.error("Sign-in failed: ", JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 0.2 }} />
      <Image
        source={require("@/assets/images/Logo_Airbnb-colored.png")}
        style={{
          height: 100,
          width: 100,
          alignSelf: "center",
          marginVertical: 10,
        }}
      />
      <Text
        style={{
          flex: 0.15,
          alignSelf: "center",
          fontSize: 32,
          fontWeight: 600,
          color: Colors.primary,
        }}
      >
        AirBnb
      </Text>

      <View
        style={{
          paddingHorizontal: 32,
          gap: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 500 }}>Se connecter</Text>
        <View style={{ gap: 4 }}>
          <Text>Email</Text>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="abc@mail.com"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            style={{
              paddingVertical: 16,
              borderWidth: 0.5,
              borderColor: "#E8E8E8",
              borderRadius: 8,
              paddingLeft: 16,
            }}
          />
        </View>

        <View style={{ gap: 4 }}>
          <Text>Mot de passe</Text>
          <TextInput
            value={password}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={{
              paddingVertical: 16,
              borderWidth: 0.5,
              borderColor: "#E8E8E8",
              borderRadius: 8,
              paddingLeft: 16,
            }}
          />
        </View>
      </View>

      <View style={{ flex: 0.6 }} />

      <View style={{ paddingHorizontal: 32, gap: 16 }}>
        <TouchableOpacity
          onPress={onSignInPress}
          disabled={isSignedIn}
          style={{
            paddingVertical: 16,
            backgroundColor: isSignedIn ? "gray" : Colors.primary,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: 600,
              alignSelf: "center",
            }}
          >
            Continuer
          </Text>
        </TouchableOpacity>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Text>Pas encore de compte ?</Text>
          <Link
            href="/sign-up"
            style={{ textDecorationLine: "underline" }}
            push
            asChild
          >
            <Text style={{ fontWeight: 500 }}>Se créer un compte</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
