import * as React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifyPassword, setVerifyPassword] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (password !== verifyPassword) {
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });
      router.replace("/sign-in");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
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

      <View style={{ paddingHorizontal: 32, gap: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 500 }}>
          Se créer un compte
        </Text>
        <Text>Email</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="abc@mail.com"
          onChangeText={(email) => setEmailAddress(email)}
          style={{
            paddingVertical: 16,
            borderWidth: 0.5,
            borderColor: "#E8E8E8",
            borderRadius: 8,
            paddingLeft: 16,
          }}
        />

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

        <View style={{ gap: 4 }}>
          <Text>Confirmer le mot de passe</Text>
          <TextInput
            value={verifyPassword}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={(verifyPassword) => setVerifyPassword(verifyPassword)}
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
      <View style={{ flex: 0.59 }} />

      <View style={{ paddingHorizontal: 32, gap: 16 }}>
        <TouchableOpacity
          onPress={onSignUpPress}
          style={{
            paddingVertical: 16,
            backgroundColor: Colors.primary,
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
            Continue
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
          <Text>Vous avez déjà un compte ?</Text>
          <Link
            href="/sign-in"
            style={{ textDecorationLine: "underline" }}
            push
            asChild
          >
            <Text style={{ fontWeight: 500 }}>Se connecter</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
