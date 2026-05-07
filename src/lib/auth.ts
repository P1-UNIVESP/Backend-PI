import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

import { prisma } from "./prisma";

const getTrustedOrigins = () => {
  const origins = process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? process.env.CORS_ORIGIN;

  if (!origins) {
    return [];
  }

  return origins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const getAdminUserIds = () => {
  const ids = process.env.BETTER_AUTH_ADMIN_USER_IDS;

  if (!ids) {
    return [];
  }

  return ids
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
};

export const auth = betterAuth({
  appName: "Univesp P1",
  baseURL: process.env.BETTER_AUTH_URL ?? `http://localhost:${process.env.PORT ?? 3000}`,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  trustedOrigins: getTrustedOrigins(),
  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
      adminUserIds: getAdminUserIds(),
    }),
  ],
});
