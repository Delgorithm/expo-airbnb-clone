import { database, appwriteConfig, client } from "@/lib/appwrite";
import { useUser } from "@/lib/clerk";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import { useHeaderHeight } from "@react-navigation/elements";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { ID, Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoomId() {
  const { roomId: chatRoomId } = useLocalSearchParams();
  const { user } = useUser();

  if (!chatRoomId) {
    return <Text>Aucune conversation.</Text>;
  }

  const [messageContent, setMessageContent] = useState("");
  const [chatRoom, setChatRoom] = useState<chatRoomId | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const headerHeight = Platform.OS === "ios" ? useHeaderHeight() : 0;
  const textInputRef = useRef<TextInput>(null);
  const email = user.primaryEmailAddress?.emailAddress ?? "";
  const pseudo = email.split("@")[0];

  useEffect(() => {
    handleFirstLoad();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);
    }
  }, [isLoading]);

  useEffect(() => {
    const channel = `databases.${appwriteConfig.db}.collections.${appwriteConfig.col.chatRooms}.documents.${chatRoomId}`;

    const unsubscribe = client.subscribe(channel, () => {
      console.log("Chat room updated");
      getMessages();
    });

    return () => {
      unsubscribe();
    };
  }, [chatRoomId]);

  async function handleFirstLoad() {
    try {
      await getChatRoom();
      await getMessages();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getChatRoom() {
    const document = await database.getDocument(
      appwriteConfig.db,
      appwriteConfig.col.chatRooms,
      chatRoomId as string,
    );

    setChatRoom(document as unknown as ChatRoom);
  }

  async function getMessages() {
    try {
      const { documents, total } = await database.listDocuments(
        appwriteConfig.db,
        appwriteConfig.col.message,
        [
          Query.equal("chatRoomId", chatRoomId),
          Query.limit(100),
          Query.orderDesc("$createdAt"),
        ],
      );
      documents.reverse();

      setMessages(documents as unknown as Message[]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSendMessage() {
    if (messageContent.trim() === "") return;

    const message = {
      content: messageContent,
      senderId: user?.id!,
      senderName: pseudo || "Anonymous",
      senderPhoto: user?.imageUrl ?? "",
      chatRoomId: chatRoomId as string,
    };

    try {
      await database.createDocument(
        appwriteConfig.db,
        appwriteConfig.col.message,
        ID.unique(),
        message,
      );
      setMessageContent("");

      console.log("Updating chat room, ", chatRoomId);

      await database.updateDocument(
        appwriteConfig.db,
        appwriteConfig.col.chatRooms,
        chatRoomId as string,
        { $updatedAt: new Date().toISOString() },
      );
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: chatRoom?.title,
          headerRight: () => (
            <Link
              href={{
                pathname: "/settings/[chat]",
                params: { chat: chatRoomId as string },
              }}
            >
              <FontAwesome name="gear" size={18} color="black" />
            </Link>
          ),
        }}
      />
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"padding"}
          keyboardVerticalOffset={headerHeight}
        >
          <LegendList
            data={messages}
            renderItem={({ item }) => {
              const isSender = item.sendId === user?.id;
              return (
                <View
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 6,
                    maxWidth: "80%",
                    alignSelf: isSender ? "flex-start" : "flex-end",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: isSender ? "#DEDEDE" : "#FDFDFD",
                      flex: 1,
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "500", marginBottom: 4 }}>
                      {item.senderName}
                    </Text>
                    <Text>{item.content}</Text>
                    <Text style={{ fontSize: 10, textAlign: "right" }}>
                      {new Date(item.$createdAt!).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                  {!isSender && (
                    <Image
                      source={{ uri: item.senderPhoto }}
                      style={{ width: 30, height: 30, borderRadius: 15 }}
                    />
                  )}
                </View>
              );
            }}
            keyExtractor={(item) => item?.$id ?? "unknown"}
            contentContainerStyle={{ padding: 10 }}
            recycleItems={true}
            initialScrollIndex={messages.length - 1}
            alignItemsAtEnd
            maintainScrollAtEnd
            maintainScrollAtEndThreshold={0.5}
            maintainVisibleContentPosition
            estimatedItemSize={100}
          />

          <View
            style={{
              borderWidth: 1,
              borderColor: "black",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 20,
              marginBottom: 6,
              marginHorizontal: 10,
            }}
          >
            <TextInput
              ref={textInputRef}
              placeholder="Ecrire une message..."
              style={{ minHeight: 40, flexShrink: 1, flexGrow: 1, padding: 10 }}
              placeholderTextColor={"gray"}
              multiline
              value={messageContent}
              onChangeText={setMessageContent}
            />
            <Pressable
              onPress={handleSendMessage}
              style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="send" size={24} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
