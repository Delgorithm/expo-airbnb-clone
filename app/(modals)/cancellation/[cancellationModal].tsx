import { drizzle } from "drizzle-orm/expo-sqlite";
import { Pressable, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { eq } from "drizzle-orm";
import { reservations } from "@/db/schema";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

const db = drizzle(SQLite.openDatabaseSync("db.db"));

export default function CancellationModal() {
  const [hasReservation, setHasReservation] = useState<null | {
    listingId: number;
  }>(null);
  const { cancellationModal } = useLocalSearchParams();
  const listingCurrentId = cancellationModal;

  useEffect(() => {
    const fetchReservation = async () => {
      const result = db
        .select({
          listingId: reservations.listingId,
        })
        .from(reservations)
        .where(eq(reservations.listingId, Number(listingCurrentId)))
        .limit(1)
        .get();

      if (result) {
        setHasReservation(result);
      }
    };
    fetchReservation();
  }, [listingCurrentId]);

  const handleCancelReservation = async () => {
    db.delete(reservations)
      .where(eq(reservations.listingId, Number(listingCurrentId)))
      .run();

    router.back();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Cancellation</Text>
      <Pressable
        onPress={handleCancelReservation}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 16,
          backgroundColor: "black",
        }}
      >
        <Text style={{ color: "white" }}>Annuler la réservation</Text>
      </Pressable>
    </View>
  );
}
