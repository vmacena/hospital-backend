import { PrismaClient } from "@prisma/client";
import { seedUserRoles, seedAppointmentStatuses } from "./seed";

const prismaClient = new PrismaClient();

async function main() {
  console.log('Starting script...');

  try {
    await seedUserRoles();
    await seedAppointmentStatuses();
    console.log('Enums created or already exist.');
  } catch (error) {
    console.error('Error during initialization:', error);
  } finally {
    await prismaClient.$disconnect();
    console.log('Disconnected from Prisma Client.');
  }
}

main()
  .catch((e) => {
    console.error('Error in main function:', e);
    process.exit(1);
  });

export default prismaClient;