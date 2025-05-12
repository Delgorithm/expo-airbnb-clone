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

      <Stack.Screen
        name="category/[name]"
        options={{
          headerShown: false,
          title: "Category",
          presentation: "formSheet",
          gestureDirection: "vertical",
          animation: "slide_from_bottom",
          sheetGrabberVisible: true,
          sheetInitialDetentIndex: 0,
          sheetAllowedDetents: [0.5, 0.75, 1],
          sheetCornerRadius: 20,
          sheetExpandsWhenScrolledToEdge: true,
          sheetElevation: 24,
        }}
      />

      <Stack.Screen
        name="reservation/[reservationModal]"
        options={{
          headerShown: false,
          title: "Réservation",
          presentation: "formSheet",
          gestureDirection: "vertical",
          animation: "slide_from_bottom",
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.5],
          sheetCornerRadius: 20,
          sheetExpandsWhenScrolledToEdge: true,
          sheetElevation: 24,
        }}
      />

      <Stack.Screen
        name="calendar/[calendarModal]"
        options={{
          headerShown: false,
          title: "Calendrier",
          presentation: "formSheet",
          gestureDirection: "vertical",
          animation: "slide_from_bottom",
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.5, 0.85],
          sheetCornerRadius: 20,
          sheetExpandsWhenScrolledToEdge: true,
          sheetElevation: 24,
        }}
      />

      <Stack.Screen
        name="cancellation/[cancellationModal]"
        options={{
          headerShown: false,
          title: "Annulation",
          presentation: "formSheet",
          gestureDirection: "vertical",
          animation: "slide_from_bottom",
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.5, 0.85],
          sheetCornerRadius: 20,
          sheetExpandsWhenScrolledToEdge: true,
          sheetElevation: 24,
        }}
      />
    </Stack>
  );
}
