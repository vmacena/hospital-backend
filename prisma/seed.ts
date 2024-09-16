import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const accessLevels = [
    { level: "Admin" },
    { level: "Doctor" },
    { level: "Patient" },
  ];

  for (const accessLevel of accessLevels) {
    await prisma.accessLevel.create({
      data: accessLevel,
    });
  }

  console.log("Níveis de acesso inseridos com sucesso!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });