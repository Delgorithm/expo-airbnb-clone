import { Stack } from "expo-router";

export default function LayoutInbox() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[roomId]"
        options={{ headerShown: true, headerBackTitle: "Retour" }}
      />
      <Stack.Screen
        name="settings/[chat]"
        options={{
          headerShown: true,
          headerBackTitle: "Retour",
          title: "Paramètres",
        }}
      />
    </Stack>
  );
}
