import { calculateNumberOfNights } from "@/lib/calculateNumberOfNights";
import formatDateFr from "@/lib/formatDateFr";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Control, useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import Separator from "../ui/separator";

type SummaryFormStepProps = {
  control: Control<any>;
  onConfirm: () => void;
  setStep: React.Dispatch<
    React.SetStateAction<"calendar" | "guests" | "summary">
  >;
};

export default function SummaryFormStep({
  control,
  onConfirm,
  setStep,
}: SummaryFormStepProps) {
  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });
  const adults = useWatch({ control, name: "adults" });
  const children = useWatch({ control, name: "children" });
  const babies = useWatch({ control, name: "babies" });
  const pets = useWatch({ control, name: "pets" });

  return (
    <View
      style={{
        paddingTop: 32,
        paddingHorizontal: 24,
        paddingBottom: 100,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Pressable onPress={() => setStep("guests")}>
          <Ionicons name="arrow-back" size={24} />
        </Pressable>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "600",
          }}
        >
          Récapitulatif
        </Text>

        <Pressable onPress={() => router.back()}>
          <FontAwesome6 name="xmark" size={24} />
        </Pressable>
      </View>

      <View>
        <Image
          source={{ uri: faker.image.urlLoremFlickr() }}
          style={{ height: 200, width: "100%", borderRadius: 10 }}
          contentFit="cover"
        />

        <Text style={{ fontSize: 28, fontWeight: 600, marginVertical: 10 }}>
          Nom du domaine
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <Text style={{ color: "gray", fontSize: 16 }}>
            {formatDateFr({ dateString: startDate })}
          </Text>
          <Text
            style={{
              color: "gray",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            -
          </Text>
          <Text style={{ color: "gray", fontSize: 16 }}>
            {formatDateFr({ dateString: endDate })}
          </Text>

          <Text style={{ color: "gray", fontSize: 16 }}>
            ({calculateNumberOfNights({ start: startDate, end: endDate })}{" "}
            nuits)
          </Text>
        </View>

        <Separator width={"100%"} marginHorizontal={0} marginVertical={16} />

        <View style={{ gap: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 240,
            }}
          >
            <Text
              style={{
                backgroundColor: "black",
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 6,
                color: "white",
                fontWeight: 600,
              }}
            >
              Adultes : {adults}
            </Text>
            {children && children > 0 ? (
              <Text
                style={{
                  backgroundColor: "black",
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 6,
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Enfants : {children}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 240,
            }}
          >
            {babies && babies > 0 ? (
              <Text
                style={{
                  backgroundColor: "black",
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 6,
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Nourrissons : {babies}
              </Text>
            ) : null}
            {pets && pets > 0 ? (
              <Text
                style={{
                  backgroundColor: "black",
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 6,
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Animaux : {pets}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => {
          onConfirm();
          router.back();
        }}
        style={({ pressed }) => [
          {
            position: "absolute",
            bottom: 30,
            right: 0,
            left: 0,
            backgroundColor: "black",
            marginHorizontal: 24,
            paddingVertical: 10,
            borderRadius: 10,
            opacity: pressed ? 0.6 : 1,
          },
        ]}
      >
        <Text
          style={{
            fontWeight: 500,
            fontSize: 20,
            textAlign: "center",
            color: "white",
          }}
        >
          Confirmer
        </Text>
      </Pressable>
    </View>
  );
}
