import { Control } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GuestCounterRow from "./guest-counter-row";
import { router } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

type GuestFormStepProps = {
  control: Control<any>;
  setStep: React.Dispatch<
    React.SetStateAction<"calendar" | "guests" | "summary">
  >;
};

export default function GuestFormStep({
  control,
  setStep,
}: GuestFormStepProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 200,
        borderRadius: 20,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1, position: "relative" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
          }}
        >
          <Pressable onPress={() => setStep("calendar")}>
            <Ionicons name="arrow-back" size={24} />
          </Pressable>

          <Text
            style={{
              fontSize: 26,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Combien de personnes
          </Text>

          <Pressable onPress={() => router.back()}>
            <FontAwesome6 name="xmark" size={24} />
          </Pressable>
        </View>
        <GuestCounterRow
          control={control}
          name="adults"
          title="Adultes"
          subtitle="Âgés de 13 ans ou plus"
          canBeZero={false}
        />

        <GuestCounterRow
          control={control}
          name="children"
          title="Enfants"
          subtitle="Âgés entre 2 - 12 ans"
        />

        <GuestCounterRow
          control={control}
          name="babies"
          title="Nourissons"
          subtitle="Moins de 2 ans"
        />

        <GuestCounterRow
          control={control}
          name="pets"
          title="Animaux"
          subtitle="Je prends un animan de service ?"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 16,
        }}
      >
        <Pressable onPress={() => {}}>
          <Text style={{ textDecorationLine: "underline" }}>Réinitialiser</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setStep("summary");
          }}
          style={({ pressed }) => [
            {
              backgroundColor: "black",
              paddingVertical: 14,
              paddingHorizontal: 32,
              borderRadius: 10,
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
            Suivant
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
