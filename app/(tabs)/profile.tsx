import { users } from "@/db/schema";
import { useAuth, useUser } from "@/lib/clerk";
import { Redirect, Link } from "expo-router";
import { Image, Text, View, Pressable } from "react-native";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Separator from "@/components/ui/separator";
import { eq } from "drizzle-orm";
import ParametersList from "@/components/profile/parameters";

const expo = SQLite.openDatabaseSync("db.db");

const db = drizzle(expo);

const parameters = [
  { name: "user", text: "Informations personnelles" },
  { name: "creditcard", text: "Méthodes de paiements" },
  { name: "filetext1", text: "Taxes" },
  { name: "Safety", text: "Connexion & Sécurité" },
  { name: "setting", text: "Accessibilité" },
];

export default function Profile() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const userInDB = db.select().from(users).where(eq(users.id, user.id)).get();

  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  return (
    <View
      style={{
        flex: 1,
        gap: 32,
        marginTop: 80,
        marginHorizontal: 24,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: 500 }}>Profile</Text>
        <FontAwesome name="bell-o" size={32} />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
          <Image
            source={{ uri: userInDB?.image }}
            style={{ height: 60, width: 60, borderRadius: 9999 }}
          />
          <View>
            <Text style={{ fontSize: 20 }}>{userInDB?.name}</Text>
            <Text style={{ fontWeight: 300 }}>Voir le profile</Text>
          </View>
        </View>

        <Entypo name="chevron-small-right" size={40} />
      </View>

      <Separator />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingHorizontal: 20,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: "#cfcfcf",
        }}
      >
        <View style={{ width: "65%", gap: 14 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>
            Votre maison Airbnb
          </Text>
          <Text style={{ width: "90%" }}>
            C'est facile de commencer et de gagner des revenus.
          </Text>
        </View>
        <Image
          source={require("@/assets/images/house.png")}
          style={{ height: 130, width: 130 }}
        />
      </View>
      <Text style={{ fontSize: 20, fontWeight: 500 }}>Paramètres</Text>
      <View>
        {parameters.map((param, index) => (
          <Link
            key={index}
            href={{
              pathname: "/(modals)/parameters/[parametersModal]",
              params: { parametersModal: param.text },
            }}
            asChild
            push
          >
            <Pressable>
              <ParametersList name={param.name} text={param.text} />
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}
