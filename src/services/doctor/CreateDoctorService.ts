import { PrismaClient } from "@prisma/client";

class CreateDoctorService {
  private prisma = new PrismaClient();

  async execute(crm: string, nameDoctor: string, specialty: string) {
    const existingDoctor = await this.prisma.doctor.findUnique({
      where: {
        crm
      },
    });

    if (existingDoctor) {
      throw new Error("Doctor already registered with this crm.");
    }
    

    const accessLevelId = 2;

    const doctor = await this.prisma.doctor.create({
      data: {
        crm,
        nameDoctor,
        specialty,
        accessLevelId,
      },
    });

    return doctor;
  }
}

export { CreateDoctorService };