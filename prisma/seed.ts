import "dotenv/config";

import { prisma } from "../src/lib/prisma";
import { auth } from "../src/lib/auth";

const adminName = process.env.SEED_ADMIN_NAME ?? "Admin";
const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "admin123456";

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (existingAdmin) {
    await prisma.user.update({
      where: {
        id: existingAdmin.id,
      },
      data: {
        name: adminName,
        role: "admin",
        banned: false,
        banReason: null,
        banExpires: null,
      },
    });

    console.log(`Admin ja existia e foi atualizado: ${adminEmail}`);
    return;
  }

  await auth.api.createUser({
    body: {
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    },
  });

  console.log(`Admin criado: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
