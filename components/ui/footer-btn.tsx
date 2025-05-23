import { Colors } from "@/constants/Colors";
import { reservations } from "@/db/schema";
import { useUser } from "@/lib/clerk";
import { Ionicons } from "@expo/vector-icons";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

const db = drizzle(SQLite.openDatabaseSync("db.db"));

type FooterBtnProps = {
  listing: {
    id: number;
    price: number;
    title: string;
  };
};

export default function FooterBtn({ listing }: FooterBtnProps) {
  const { user } = useUser();
  const [hasReservation, setHasReservation] = useState<boolean>(false);

  useEffect(() => {
    const fetchReservation = async () => {
      const result = db
        .select({
          listingId: reservations.listingId,
        })
        .from(reservations)
        .where(eq(reservations.listingId, listing.id))
        .limit(1)
        .get();

      if (result) {
        setHasReservation(result);
      }
    };
    fetchReservation();
  }, [listing.id]);

  if (!listing || !listing.price || !listing.title) return null;

  const linkHref = hasReservation
    ? {
        pathname: "/(modals)/reservation/[reservationModal]",
        params: {
          id: listing.id,
          price: listing.price.toString(),
        },
      }
    : {
        pathname: "/(modals)/form/[formModal]",
        params: {
          formModal: listing.id.toString(),
        },
      };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 0.5,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <View style={{ marginVertical: 14 }}>
        <Text
          style={{
            fontWeight: 500,
            fontSize: 18,
            textDecorationLine: "underline",
          }}
        >
          {listing.price} € / nuit
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 10,
            paddingVertical: 4,
            backgroundColor: "#E5E5E5",
            borderRadius: 999,
            marginTop: 4,
          }}
        >
          <Ionicons name="checkmark-outline" size={16} color={"black"} />
          <Text>Annulation gratuite</Text>
        </View>
      </View>
      <Link
        href={linkHref}
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 14,
          paddingHorizontal: 44,
          borderRadius: 8,
        }}
        asChild
        push
      >
        <Pressable>
          <Text
            style={{
              color: "white",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {hasReservation ? "Réservation" : "Réserver"}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
