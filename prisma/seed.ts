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
      address: {
        create: {
          cep: "12345-678",
          street: "Admin Street",
          district: "Admin District",
          state: "Admin State",
          city: "Admin City",
          number: 1,
          complement: "Admin Complement",
        },
      },
      accessLevel: { connect: { level: "Admin" } },
    },
  });

  const doctor1 = await prisma.doctor.create({
    data: {
      crm: "123456",
      nameDoctor: "Dr. Vinicius Macena",
      specialty: "Urologista",
      address: {
        create: {
          cep: "12345-678",
          street: "Doctor Street",
          district: "Doctor District",
          state: "Doctor State",
          city: "Doctor City",
          number: 2,
          complement: "Doctor Complement",
        },
      },
      accessLevel: { connect: { level: "Doctor" } },
    },
  });

  const patient1 = await prisma.patient.create({
    data: {
      susNumber: BigInt("123456789012345"),
      namePatient: "Patient Name",
      email: "patient@example.com",
      address: {
        create: {
          cep: "12345-678",
          street: "Patient Street",
          district: "Patient District",
          state: "Patient State",
          city: "Patient City",
          number: 3,
          complement: "Patient Complement",
        },
      },
      accessLevel: { connect: { level: "Patient" } },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });