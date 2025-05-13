import { Control, useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

type SummaryFormStepProps = {
  control: Control<any>;
  onConfirm: () => void;
};

export default function SummaryFormStep({
  control,
  onConfirm,
}: SummaryFormStepProps) {
  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });
  const adults = useWatch({ control, name: "adults" });
  const children = useWatch({ control, name: "children" });
  const babies = useWatch({ control, name: "babies" });
  const pets = useWatch({ control, name: "pets" });

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: "white" }}>
      <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
        Récapitulatif
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        {startDate} - {endDate}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Adultes : {adults}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Enfants : {children}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Nourrissons : {babies}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Animaux : {pets}</Text>

      <Pressable
        onPress={onConfirm}
        style={({ pressed }) => [
          {
            marginTop: 30,
            backgroundColor: "black",
            paddingVertical: 14,
            paddingHorizontal: 32,
            borderRadius: 10,
            opacity: pressed ? 0.6 : 1,
          },
        ]}
      >
        <Text
          style={{
            color: "white",
            fontWeight: 500,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Confirmer
        </Text>
      </Pressable>
    </View>
  );
}
