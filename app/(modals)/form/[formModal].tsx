import { SafeAreaView } from "react-native";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CalendarFormStep from "@/components/form/calendar-form-step";
import GuestFormStep from "@/components/form/guest-form-step";
import SummaryFormStep from "@/components/form/summary-form-step";
import { useLocalSearchParams } from "expo-router";
import listings from "@/assets/data/listings.json";

export default function ReservationModal() {
  const [step, setStep] = useState<"calendar" | "guests" | "summary">(
    "calendar",
  );

  const { formModal } = useLocalSearchParams();
  const listingId = parseInt(formModal as string);
  const listing = listings.find((l) => l.id === listingId);
  if (!listing) return null;

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      adults: 1,
      children: 0,
      babies: 0,
      pets: 0,
    },
  });

  const onConfirm = handleSubmit((data) => {
    console.log("Réservation validée : ", data);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {step === "calendar" && (
        <CalendarFormStep
          control={control}
          setValue={setValue}
          getValues={getValues}
          setStep={setStep}
        />
      )}

      {step === "guests" && (
        <GuestFormStep
          control={control}
          setValue={setValue}
          getValues={getValues}
          setStep={setStep}
        />
      )}

      {step === "summary" && (
        <SummaryFormStep
          control={control}
          setValue={setValue}
          getValues={getValues}
          setStep={setStep}
          onConfirm={onConfirm}
          listing={listing}
        />
      )}
    </SafeAreaView>
  );
}
