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

  const admin1 = await prisma.admin.create({
    data: {
      record: "admin",
      accessLevel: { connect: { level: "Admin" } },
    },
  });

  const doctor1 = await prisma.doctor.create({
    data: {
      crm: "123456",
      nameDoctor: "Dr. Vinicius Macena",
      specialty: "Urologista",
      accessLevel: { connect: { level: "Doctor" } },
    },
  });

  const patient1 = await prisma.patient.create({
    data: {
      susNumber: BigInt("123456"),
      namePatient: "Gabriel Manhani",
      email: "vinicius@example.com",
      accessLevel: { connect: { level: "Patient" } },
    },
  });

  await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      date: new Date(),
      status: "Agendado",
    },
  });

  await prisma.exam.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      type: "Exame de Prostata",
      date: new Date(),
      result: "Pendente",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });