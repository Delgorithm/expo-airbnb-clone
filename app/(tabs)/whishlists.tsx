import { useState, useCallback } from "react";
import { View, Text, Image, Pressable } from "react-native";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { useUser } from "@/lib/clerk";
import { wishlists } from "@/db/schema";
import { Link, useFocusEffect } from "expo-router";

const db = drizzle(SQLite.openDatabaseSync("db.db"));

export default function Wishlist() {
  const { user } = useUser();
  const [wishlistInDB, setWishlistInDB] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const houseImages = [
    require("@/assets/images/city.png"),
    require("@/assets/images/arriving.png"),
    require("@/assets/images/house.png"),
    require("@/assets/images/tepee.png"),
    require("@/assets/images/wood-house.png"),
    require("@/assets/images/lakefront-house.png"),
  ];

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        if (!user?.id) return;

        setLoading(true);

        const rows = db
          .select()
          .from(wishlists)
          .where(eq(wishlists.userId, user.id))
          .all();

        if (isActive) {
          setWishlistInDB(rows);
          setLoading(false);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [user?.id]),
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (wishlistInDB.length > 0) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",

          paddingTop: 80,
          paddingHorizontal: 24,
          backgroundColor: "white",
        }}
      >
        {wishlistInDB.map((item, index) => {
          const randomImage =
            houseImages[Math.floor(Math.random() * houseImages.length)];

          return (
            <Link
              key={index}
              href={{
                pathname: `/(modals)/details/[id]`,
                params: { id: item.id.toString() },
              }}
              style={{
                width: "48%",
                paddingVertical: 10,
                marginBottom: 16,
                borderRadius: 8,
                overflow: "hidden",
                borderWidth: 0.5,
                borderColor: "#E2E2E2",
                justifyContent: "center",
                alignItems: "center",
              }}
              asChild
              push
            >
              <Pressable>
                <Image
                  source={randomImage}
                  style={{ height: 200, width: 200 }}
                />
                <Text>{item.title}</Text>
                <Text>{item.location}</Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    );
  }

  if (wishlistInDB.length === 0 || null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("@/assets/images/nothing-here.png")}
          style={{ height: 300, width: 300 }}
        />
        <Text>Partez à la recherche de ce qui vous plait</Text>
      </View>
    );
  }
}
