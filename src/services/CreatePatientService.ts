import { PrismaClient } from "@prisma/client";

class CreatePatientService {
  private prisma = new PrismaClient();

  async execute(namePatient: string, email: string, accessLevelId: number) {
    const existingPatient = await this.prisma.patient.findUnique({
      where: {
        email,
      },
    });

    if (existingPatient) {
      throw new Error("Patient already registered with this email.");
    }

    // Gerar um susNumber único
    const susNumber = BigInt(Date.now() + Math.floor(Math.random() * 1000));

    const patient = await this.prisma.patient.create({
      data: {
        susNumber,
        namePatient,
        email,
        accessLevelId,
      },
    });

    return patient;
  }
}

export { CreatePatientService };