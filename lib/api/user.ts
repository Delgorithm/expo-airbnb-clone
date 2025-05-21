import { useUser } from "@/lib/clerk";
import { reservations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";

export const useUserReservations = () => {
  const { user } = useUser();

  return db
    .select()
    .from(reservations)
    .where(eq(reservations.userId, user.id))
    .all();
};
