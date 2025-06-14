import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import { eq } from "drizzle-orm";
import { reservations } from "@/db/schema";
import { useEffect, useState } from "react";
import { calculateNumberOfNights } from "@/lib/calculate-number-of-nights";

const db = drizzle(SQLite.openDatabaseSync("db.db"));

export default function ReservationModal() {
  const { id, price } = useLocalSearchParams();
  const [dateReservation, setDateReservation] = useState<null | {
    startDate: string;
    endDate: string;
  }>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      const result = db
        .select({
          startDate: reservations.startDate,
          endDate: reservations.endDate,
        })
        .from(reservations)
        .where(eq(reservations.listingId, id))
        .limit(1)
        .get();

      if (result) {
        setDateReservation(result);
      }
    };

    fetchReservation();
  }, [id]);

  const numberOfNights = dateReservation
    ? calculateNumberOfNights({
        start: dateReservation.startDate,
        end: dateReservation.endDate,
      })
    : 0;

  const totalPrice = Number(price) * numberOfNights;
  const serviceAirbnb = Math.ceil(totalPrice * 0.2);
  const totalPriceBeforeTaxes = totalPrice + serviceAirbnb;

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        marginHorizontal: 24,
        paddingTop: 40,
        gap: 8,
      }}
    >
      <Text style={{ fontSize: 26, fontWeight: 500 }}>Détails du prix</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 300 }}>
          {price}€ x {numberOfNights} nuits
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 300 }}>{totalPrice}€</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 300 }}>Service Airbnb</Text>
        <Text style={{ fontSize: 16, fontWeight: 300 }}>{serviceAirbnb}€</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 500 }}>
          Total avant les taxes
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>
          {totalPriceBeforeTaxes}€
        </Text>
      </View>

      <View
        style={{
          marginVertical: 24,
          backgroundColor: "#E2E2E2",
          height: 0.5,
          width: "100%",
        }}
      />

      <Text style={{ fontSize: 16, fontWeight: 500 }}>Dates</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: 300 }}>Futur Dates</Text>
          <Text style={{ fontSize: 12, fontWeight: 200 }}>
            Annulation gratuite avant le
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            {
              paddingHorizontal: 10,
              paddingVertical: 6,
              backgroundColor: "#E2E2E2",
              borderRadius: 6,
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text>Changer</Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: Colors.primary,
            paddingVertical: 14,
            paddingHorizontal: 44,
            borderRadius: 8,
            marginTop: 24,
            opacity: pressed ? 0.6 : 1,
          },
        ]}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: 500,
            fontSize: 18,
            color: "white",
          }}
        >
          Fermer
        </Text>
      </Pressable>
    </View>
  );
}
