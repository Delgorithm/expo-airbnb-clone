import { calculateNumberOfNights } from "@/lib/calculate-number-of-nights";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import { reservations } from "@/db/schema";

const db = drizzle(SQLite.openDatabaseSync("db.db"));

type insertReservationProps = {
  listingId: number;
  userId: string;
  startDate: string;
  endDate: string;
  adults: number;
  children?: number;
  babies?: number;
  pets?: number;
  price: number;
};

export const insertReservation = async ({
  listingId,
  userId,
  startDate,
  endDate,
  adults,
  children = 0,
  babies = 0,
  pets = 0,
  price,
}: insertReservationProps) => {
  const guests = adults + children;

  console.log("Dates reçues : ", { startDate, endDate });

  const totalNights = calculateNumberOfNights({
    start: startDate,
    end: endDate,
  });
  const totalPrice = price * totalNights;

  db.insert(reservations)
    .values({
      listingId,
      userId,
      startDate,
      endDate,
      adults,
      children,
      babies,
      pets,
      guests,
      totalPrice,
      status: "confirmed",
      createdAt: new Date(),
    })
    .run();

  console.log("Réservation ajoutée");
};
