import { Stack } from "expo-router";

export default function DetailsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="details/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
