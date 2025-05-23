import { Ionicons } from "@expo/vector-icons";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { eq, and } from "drizzle-orm";
import { useUser } from "@/lib/clerk";
import { wishlists } from "@/db/schema";
import { useEffect, useState } from "react";

const expo = SQLite.openDatabaseSync("db.db");
const db = drizzle(expo);

type HeaderButtonsProps = {
  listing: {
    title: string;
    city: string;
    country: string;
  };
};

export default function HeaderButtons({ listing }: HeaderButtonsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    const checkWishlist = async () => {
      if (!user?.id || !listing?.title) return;

      const existing = db
        .select()
        .from(wishlists)
        .where(
          and(eq(wishlists.userId, user.id), eq(wishlists.name, listing.title)),
        )
        .get();

      setIsWishlisted(!!existing);
    };

    checkWishlist();
  }, [user.id, listing.title]);

  const handleWishlists = async () => {
    if (!user?.id) return;

    const existing = db
      .select()
      .from(wishlists)
      .where(
        and(eq(wishlists.userId, user.id), eq(wishlists.name, listing.title)),
      )
      .get();

    if (existing) {
      db.delete(wishlists)
        .where(
          and(eq(wishlists.userId, user.id), eq(wishlists.name, listing.title)),
        )
        .run();

      setIsWishlisted(false);
    } else {
      db.insert(wishlists)
        .values({
          name: listing.title,
          userId: user.id,
          createdAt: new Date(),
        })
        .run();

      setIsWishlisted(true);
    }
  };

  if (!listing || !listing.title || !listing.city || !listing.country)
    return null;

  return (
    <View>
      <Pressable
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: 56,
          left: 20,
          zIndex: 999,
          borderRadius: 999,
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color="black"
          style={{ padding: 8, borderRadius: 999, backgroundColor: "white" }}
        />
      </Pressable>
      <View>
        <Pressable
          style={{ position: "absolute", top: 56, right: 80, zIndex: 999 }}
        >
          <Ionicons
            name="share-outline"
            size={20}
            color="black"
            style={{
              padding: 8,
              borderRadius: 999,
              backgroundColor: "white",
            }}
          />
        </Pressable>

        <Pressable
          onPress={handleWishlists}
          style={{ position: "absolute", top: 56, right: 20, zIndex: 999 }}
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={20}
            color={isWishlisted ? "red" : "black"}
            style={{
              padding: 8,
              borderRadius: 999,
              backgroundColor: "white",
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}
