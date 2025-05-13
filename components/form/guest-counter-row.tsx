import { AntDesign } from "@expo/vector-icons";
import { Control, Controller } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

type GuestCounterRowProps = {
  name: string;
  control: Control<any>;
  title: string;
  subtitle: string;
  canBeZero?: boolean;
};

export default function GuestCounterRow({
  name,
  control,
  title,
  subtitle,
  canBeZero = true,
}: GuestCounterRowProps) {
  const handleDecrement = (value: number, onChange: (val: number) => void) => {
    if (canBeZero || value > 0) {
      onChange(Math.max(canBeZero ? 0 : 1, value - 1));
    }
  };

  const handleIncrement = (value: number, onChange: (val: number) => void) => {
    onChange(value + 1);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 20,
            borderBottomWidth: 0.5,
            borderColor: "#DDDDDD",
          }}
        >
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 18 }}>{title}</Text>
            <Text style={{ fontSize: 12, fontWeight: 200 }}>{subtitle}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 120,
            }}
          >
            <Pressable
              onPress={() => handleDecrement(value, onChange)}
              disabled={(!canBeZero && value <= 1) || (canBeZero && value <= 0)}
              style={{
                opacity:
                  (!canBeZero && value <= 1) || (canBeZero && value <= 0)
                    ? 0.4
                    : 1,
              }}
            >
              <AntDesign
                name="minus"
                size={16}
                color="black"
                style={{
                  padding: 10,
                  borderWidth: 0.5,
                  borderColor: "#DDDDDD",
                  borderRadius: 999,
                }}
              />
            </Pressable>

            <Text>{value}</Text>

            <Pressable onPress={() => handleIncrement(value, onChange)}>
              <AntDesign
                name="plus"
                size={16}
                color="black"
                style={{
                  padding: 10,
                  borderWidth: 0.5,
                  borderColor: "#DDDDDD",
                  borderRadius: 999,
                }}
              />
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}
