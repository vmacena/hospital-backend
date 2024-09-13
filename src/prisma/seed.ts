import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function seedUserRoles() {
  const userRoles = ['admin', 'doctor', 'patient'];
  console.log('Checking user roles...');
  for (const role of userRoles) {
    console.log(`Checking role: ${role}`);
    const existingRole = await prismaClient.userRole.findUnique({
      where: { role },
    });
    if (!existingRole) {
      await prismaClient.userRole.create({
        data: { role },
      });
      console.log(`Role '${role}' created.`);
    } else {
      console.log(`Role '${role}' already exists.`);
    }
  }
}

export async function seedAppointmentStatuses() {
  const appointmentStatuses = ['scheduled', 'completed', 'canceled'];
  console.log('Checking appointment statuses...');
  for (const status of appointmentStatuses) {
    console.log(`Checking status: ${status}`);
    const existingStatus = await prismaClient.appointmentStatus.findUnique({
      where: { status },
    });
    if (!existingStatus) {
      await prismaClient.appointmentStatus.create({
        data: { status },
      });
      console.log(`Status '${status}' created.`);
    } else {
      console.log(`Status '${status}' already exists.`);
    }
  }
}