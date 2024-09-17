import { PrismaClient } from "@prisma/client";

class GetPatientDataService {
  private prisma = new PrismaClient();

  async execute(patientId: number) {
    const patient = await this.prisma.patient.findUnique({
      where: {
        id: patientId,
      },
      include: {
        accessLevel: true,
      },
    });

    if (!patient) {
      throw new Error("Paciente não encontrado.");
    }

    return patient;
  }
}

export { GetPatientDataService };