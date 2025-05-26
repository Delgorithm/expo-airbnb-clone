const IS_DEV_MODE = process.env.EXPO_PUBLIC_USE_AUTH_MOCK === "true";

const mockUsers = {
  admin: {
    id: "admin-123",
    fullName: "Admin User",
    emailAddress: "admin@example.com",
    imageUrl: "https://i.pravatar.cc/300?img=1",
    role: "admin",
  },
  client: {
    id: "client-456",
    fullName: "Client User",
    emailAddress: "client@example.com",
    imageUrl: "https://i.pravatar.cc/300?img=2",
    role: "client",
  },
};

const currentUserRole: keyof typeof mockUsers = "admin";

export const useAuth = () => {
  if (IS_DEV_MODE) {
    return {
      isSignedIn: true,
      signOut: async () => {},
    };
  }

  const { useAuth: realUseAuth } = require("@clerk/clerk-expo");
  return realUseAuth();
};

export const useUser = () => {
  if (IS_DEV_MODE) {
    const user = mockUsers[currentUserRole];
    return {
      isLoaded: true,
      isSignedIn: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        primaryEmailAddress: {
          emailAddress: user.emailAddress,
        },
        imageUrl: user.imageUrl,
        unsafeMetadata: {
          role: user.role,
        },
      },
    };
  }

  const { useUser: realUseUser } = require("@clerk/clerk-expo");
  return realUseUser();
};
