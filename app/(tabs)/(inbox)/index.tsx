import { appwriteConfig, database } from "@/lib/appwrite";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { Query } from "react-native-appwrite";

interface ChatRoom {
  id: string;
  title: string;
  description: string;
  isPrivate: boolean;
  createdAt: Date;
  updateAt: Date;
}

interface ItemTitleProps {
  title: string;
  isPrivate: boolean;
}

interface ItemTitleAndDescriptionProps {
  title: string;
  description: string;
  isPrivate: boolean;
}

function ItemTitle({ title, isPrivate }: ItemTitleProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        {title} {isPrivate ? "🔒" : ""}
      </Text>
    </View>
  );
}

function ItemTitleAndDescription({
  title,
  description,
  isPrivate,
}: ItemTitleAndDescriptionProps) {
  return (
    <View>
      <ItemTitle title={title} isPrivate={isPrivate} />
      <Text style={{ fontSize: 13, color: "#555" }}>{description}</Text>
    </View>
  );
}

export default function Inbox() {
  const [display, setDisplay] = useState<"all" | "trips" | "support">("all");
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const { documents } = await database.listDocuments(
        appwriteConfig.db,
        appwriteConfig.col.chatRooms,
        [Query.limit(100)],
      );

      const rooms = documents.map((doc) => ({
        id: doc.$id,
        title: doc.title,
        description: doc.description,
        isPrivate: doc.isPrivate,
        createdAt: new Date(doc.createdAt),
        updateAt: new Date(doc.updatedAt),
      }));

      setChatRooms(rooms);
    } catch (error) {
      console.error("Erreur chargement rooms :", error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchChatRooms();
    setIsRefreshing(false);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 24,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 18,
          justifyContent: "flex-end",
        }}
      >
        <Pressable>
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={{
              padding: 12,
              backgroundColor: "#F9F9F9",
              borderRadius: 9999,
            }}
          />
        </Pressable>
        <Pressable>
          <Ionicons
            name="options-outline"
            size={24}
            color="black"
            style={{
              padding: 12,
              backgroundColor: "#F9F9F9",
              borderRadius: 9999,
            }}
          />
        </Pressable>
      </View>

      <Text style={{ fontSize: 32, fontWeight: "500", marginVertical: 12 }}>
        Messages
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        {["all", "trips", "support"].map((item) => (
          <Pressable
            key={item}
            onPress={() => setDisplay(item as any)}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 12,
              borderRadius: 999,
              backgroundColor: display === item ? "black" : "white",
            }}
          >
            <Text
              style={{
                color: display === item ? "white" : "black",
                fontWeight: display === item ? "700" : "400",
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {chatRooms.length === 0 ? (
        <View
          style={{ flex: 0.8, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("@/assets/images/cellphones.png")}
            style={{ height: 300, width: 300 }}
          />
          <Text style={{ fontWeight: "300", fontSize: 12, color: "#545454" }}>
            Lorsque vous recevrez des messages, ils apparaitront ici.
          </Text>
        </View>
      ) : (
        <FlatList
          data={chatRooms}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/[roomId]",
                params: { roomId: item.id },
              }}
              asChild
              push
            >
              <Pressable
                style={{
                  gap: 6,
                  padding: 24,
                  width: "100%",
                  borderRadius: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "#E2E2E2",
                  marginBottom: 12,
                }}
              >
                <ItemTitleAndDescription
                  title={item.title}
                  description={item.description}
                  isPrivate={item.isPrivate}
                />
              </Pressable>
            </Link>
          )}
          contentInsetAdjustmentBehavior="automatic"
        />
      )}
    </View>
  );
}
