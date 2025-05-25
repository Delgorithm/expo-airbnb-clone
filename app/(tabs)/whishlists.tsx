import { useState, useCallback } from "react";
import { View, Text, Image } from "react-native";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { useUser } from "@/lib/clerk";
import { wishlists } from "@/db/schema";
import { useFocusEffect } from "expo-router";

const db = drizzle(SQLite.openDatabaseSync("db.db"));

export default function Wishlist() {
  const { user } = useUser();
  const [wishlistInDB, setWishlistInDB] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return wishlistInDB.length > 0 ? (
    <View style={{ flex: 1, paddingTop: 48, backgroundColor: "white" }}>
      <Text>Favoris trouvés !</Text>
      {wishlistInDB.map((item, index) => (
        <Text key={index}>{item.name}</Text>
      ))}
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("@/assets/images/nothing-here.png")}
        style={{ height: 300, width: 300 }}
      />
    </View>
  );
}
