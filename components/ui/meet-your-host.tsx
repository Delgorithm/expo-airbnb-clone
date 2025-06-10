import { Text, View, Pressable } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { Image } from "expo-image";
import { faker } from "@faker-js/faker";
import {
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { reservations } from "@/db/schema";
import { useCallback, useState } from "react";
import formatDateFr from "@/lib/format-date-fr";

const db = drizzle(SQLite.openDatabaseSync("db.db"));

type MeetYourHostProps = {
  listing: {
    id: number;
    rating: number;
    reviews: number;
  };
  numberOfYearsAsHost: number;
};

export default function MeetYourHost({
  listing,
  numberOfYearsAsHost,
}: MeetYourHostProps) {
  const [dateReservation, setDateReservation] = useState<null | {
    startDate: string;
    endDate: string;
  }>(null);

  if (!listing || !listing.rating || !listing.reviews) return null;

  const randomRateAnswer = Math.floor(Math.random() * (100 - 90) + 90);
  const randomGuestAllowed = Math.floor(Math.random() * 6 + 1);
  const redirectionHref = dateReservation
    ? null
    : {
        pathname: "/(modals)/cancellation/[cancellationModal]",
        params: { cancellationModal: listing.id.toString() },
      };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchReservation = async () => {
        const result = db
          .select({
            startDate: reservations.startDate,
            endDate: reservations.endDate,
          })
          .from(reservations)
          .where(eq(reservations.listingId, listing.id))
          .limit(1)
          .get();

        if (isActive) {
          setDateReservation(result);
        }
      };

      fetchReservation();

      return () => {
        isActive = false;
      };
    }, [listing.id]),
  );

  return (
    <View style={{ margin: 24, gap: 20, marginTop: 600 }}>
      <Text style={{ fontSize: 20, fontWeight: 500 }}>
        Rencontrez votre hote
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "white",
          paddingVertical: 20,
          borderRadius: 40,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.21,
          shadowRadius: 7.68,
          elevation: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            gap: 10,
          }}
        >
          <Image
            source={faker.image.avatarGitHub()}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
          <Text style={{ fontSize: 24, fontWeight: 500 }}>
            {faker.internet.username({ firstName: "john", lastName: "doe" })}
          </Text>
          <Text>Super hote</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <View
            style={{
              gap: 6,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: "#E6E6E6",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 26, fontWeight: 600 }}>
              {listing.reviews}
            </Text>
            <Text>Avis</Text>
          </View>

          <View
            style={{
              gap: 6,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: "#E6E6E6",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 26, fontWeight: 600 }}>
              {listing.rating} <Ionicons name="star" size={16} />
            </Text>
            <Text>Note</Text>
          </View>

          <View
            style={{
              gap: 6,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: "#E6E6E6",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 26, fontWeight: 600 }}>
              {numberOfYearsAsHost}
            </Text>
            <Text>Années en hote</Text>
          </View>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <FontAwesome5 name="heart" size={20} />
          <Text style={{ fontSize: 16 }}>
            J&apos;aime: {faker.book.series()}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <SimpleLineIcons name="globe-alt" size={22} />
          <Text style={{ fontSize: 16 }}>
            Je vis à, {faker.location.city()}
          </Text>
        </View>
      </View>

      <View style={{ gap: 32 }}>
        <Text>
          Vous pouvez me suivre : @
          {faker.internet.username({ firstName: "john", lastName: "doe" })}
        </Text>

        <Text style={{ fontWeight: 500, textDecorationLine: "underline" }}>
          En savoir plus
        </Text>

        <Text style={{ fontWeight: 500, fontSize: 18 }}>
          {faker.internet.username({ firstName: "john", lastName: "doe" })} est
          un super hote
        </Text>

        <Text>Détails de l&apos;hote</Text>

        <View>
          <Text>Taux de réponse : {randomRateAnswer}%</Text>
          <Text>Réponds dans l&apos;heure</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            {
              paddingVertical: 16,
              backgroundColor: "#0A0A0A",
              width: "50%",
              borderRadius: 8,
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Contacter l&apos;hote
          </Text>
        </Pressable>
      </View>

      <Link
        href={{
          pathname: "/(modals)/form/[formModal]",
          params: { formModal: listing.id.toString() },
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        asChild
        push
      >
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingVertical: 20,
            paddingBottom: 20,
            borderBottomWidth: 0.5,
            borderColor: "#E2E2E2",
          }}
        >
          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>
              Disponibilitées
            </Text>
            {dateReservation ? (
              <Text style={{ fontWeight: 200 }}>
                {formatDateFr({ dateString: dateReservation.startDate })} -{" "}
                {formatDateFr({ dateString: dateReservation.endDate })}
              </Text>
            ) : (
              <Text style={{ fontWeight: 200 }}>Dates de réservation</Text>
            )}
          </View>
          <FontAwesome6 name="chevron-right" size={20} />
        </Pressable>
      </Link>

      <Link
        href={{ redirectionHref }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        asChild
        push
      >
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingBottom: 20,
            borderBottomWidth: 0.5,
            borderColor: "#E2E2E2",
          }}
        >
          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>Annulation</Text>

            {dateReservation ? (
              <Text style={{ fontWeight: 200, width: 300 }}>
                L&apos;annulation est gratuite 72 heures avant l'arivée. Annuler
                avant le{" "}
                {formatDateFr({ dateString: dateReservation.startDate })} pour
                recevoir une remboursement partiel
              </Text>
            ) : (
              <Text style={{ fontWeight: 200, width: 300 }}>
                L&apos;annulation est gratuite 72 heures avant l'arrivée
              </Text>
            )}
          </View>
          <FontAwesome6 name="chevron-right" size={20} />
        </Pressable>
      </Link>

      <View
        style={{
          gap: 6,
          paddingBottom: 20,
          borderBottomWidth: 0.5,
          borderColor: "#E2E2E2",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 500 }}>
          Règles de la propriété
        </Text>
        <Text style={{ fontWeight: 200 }}>Check-in après 16h00</Text>
        <Text style={{ fontWeight: 200 }}>Check-out avant 11h00</Text>
        <Text style={{ fontWeight: 200 }}>
          {randomGuestAllowed} invités maximum
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
            textDecorationLine: "underline",
          }}
        >
          En savoir plus
        </Text>
      </View>

      <View
        style={{
          gap: 6,
          paddingBottom: 20,
          borderBottomWidth: 0.5,
          borderColor: "#E2E2E2",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 500 }}>
          Sécurité & Propriété
        </Text>
        <Text style={{ fontWeight: 200 }}>L&apos;extérieur a des caméras</Text>
        <Text style={{ fontWeight: 200 }}>Lacs et rivières proches</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
            textDecorationLine: "underline",
          }}
        >
          En savoir plus
        </Text>
      </View>
    </View>
  );
}
