import "dotenv/config";

import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLocaleLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password)
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");

  const passwordHash = await hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: "ADMIN",
      passwordHash,
    },
    create: {
      email,
      name: "Administrator",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Admin user created/updated: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error("Failed to seed admin user: ", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
