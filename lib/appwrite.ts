import { Client, Databases } from "react-native-appwrite";

if (
  !process.env.EXPO_PUBLIC_APPWRITE_APP_ID ||
  !process.env.EXPO_PUBLIC_APPWRITE_DB_ID
) {
  throw new Error("EXPO_PUBLIC_APPWRITE_APP_ID is not set");
}

const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_APP_ID,
  plateform: process.env.EXPO_PUBLIC_PROJECT_WEBSITE,
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    chatRooms: process.env.EXPO_PUBLIC_APPWRITE_CHATROOMS_ID,
    message: process.env.EXPO_PUBLIC_APPWRITE_MESSAGE_ID,
  },
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.plateform);

const database = new Databases(client);

export { database, appwriteConfig, client };
