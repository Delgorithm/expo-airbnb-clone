import {
  sqliteTable,
  text,
  integer,
  real,
  primaryKey,
} from "drizzle-orm/sqlite-core";

// USERS
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  image: text("image"),
  role: text("role").default("client"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(Date.now()),
});

// LISTINGS
export const listings = sqliteTable("listings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  location: text("location"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(Date.now()),
});

// RESERVATIONS
export const reservations = sqliteTable("reservations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  listingId: integer("listing_id")
    .notNull()
    .references(() => listings.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").notNull().default(0),
  babies: integer("babies").notNull().default(0),
  pets: integer("pets").notNull().default(0),
  guests: integer("guests").notNull(),
  totalPrice: real("total_price").notNull(),
  status: text("status").default("confirmed"),
  cancellationReason: text("cancellation_reason"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(Date.now()),
});

// MESSAGES
export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  senderId: text("sender_id")
    .notNull()
    .references(() => users.id),
  receiverId: text("receiver_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(Date.now()),
});

// REVIEWS
export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  listingId: integer("listing_id")
    .notNull()
    .references(() => listings.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  rating: real("rating").notNull(),
  comment: text("comment"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(Date.now()),
});

// AMENITIES
export const amenities = sqliteTable("amenities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(), // e.g. "Wifi", "Cuisine"
});

// LISTING AMENITIES
export const listingAmenities = sqliteTable(
  "listing_amenities",
  {
    listingId: integer("listing_id")
      .notNull()
      .references(() => listings.id),
    amenityId: integer("amenity_id")
      .notNull()
      .references(() => amenities.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.listingId, table.amenityId] }),
  }),
);

// FAVORITE LISTINGS
export const favoriteListings = sqliteTable(
  "favorite_listings",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    listingId: integer("listing_id")
      .notNull()
      .references(() => listings.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.listingId] }),
  }),
);

//WISHLIST
export const wishlists = sqliteTable("wishlists", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  location: text("location"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  image: text("image"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(Date.now()),
});
