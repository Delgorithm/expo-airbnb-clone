import React, { useMemo, useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Control,
  UseFormSetValue,
  UseFormGetValues,
  useWatch,
} from "react-hook-form";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ],
  dayNamesShort: ["Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam.", "Dim."],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

type CalendarFormStepProps = {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  setStep: React.Dispatch<
    React.SetStateAction<"calendar" | "guests" | "summary">
  >;
};

export default function CalendarFormStep({
  control,
  setValue,
  setStep,
}: CalendarFormStepProps) {
  const initialDate = new Date().toISOString().split("T")[0];

  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });

  const onDayPress = useCallback(
    (day: DateData) => {
      const selected = day.dateString;

      if (selected === startDate && !endDate) {
        setValue("startDate", null);
        return;
      }

      if (!startDate || (startDate && endDate)) {
        setValue("startDate", selected);
        setValue("endDate", null);
      } else if (startDate && !endDate) {
        if (selected < startDate) {
          setValue("endDate", startDate);
          setValue("startDate", selected);
        } else {
          setValue("endDate", selected);
        }
      }
    },
    [startDate, endDate, setValue],
  );

  const markedDates = useMemo(() => {
    if (!startDate) return {};

    const marks: Record<string, any> = {
      [startDate]: {
        startingDay: true,
        color: "black",
        textColor: "white",
      },
    };

    if (endDate) {
      let current = new Date(startDate);
      const end = new Date(endDate);

      while (current <= end) {
        const dateStr = current.toISOString().split("T")[0];
        marks[dateStr] = marks[dateStr] || {
          color: "black",
          textColor: "white",
        };
        current.setDate(current.getDate() + 1);
      }

      marks[endDate] = {
        ...marks[endDate],
        endingDay: true,
      };
    }

    return marks;
  }, [startDate, endDate]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20,
        paddingBottom: 200,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: 32,
          paddingBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 24,
          }}
        >
          <View />
          <Text
            style={{
              fontSize: 26,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Quand partez-vous ?
          </Text>

          <Pressable onPress={() => router.back()}>
            <FontAwesome6 name="xmark" size={24} />
          </Pressable>
        </View>

        <View
          style={{
            flex: 1,
            borderBottomWidth: 0.5,
            borderColor: "#DDDDDD",
          }}
        >
          <CalendarList
            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
            current={initialDate}
            minDate={initialDate}
            pastScrollRange={0}
            futureScrollRange={4}
            collapsable={false}
            horizontal={true}
            pagingEnabled={true}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 24,
            marginVertical: 16,
          }}
        >
          <Pressable
            onPress={() => {
              setValue("startDate", null);
              setValue("endDate", null);
            }}
          >
            <Text style={{ textDecorationLine: "underline" }}>
              Réinitialiser
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              if (startDate && endDate) {
                setStep("guests");
              }
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
      </View>
    </SafeAreaView>
  );
}
