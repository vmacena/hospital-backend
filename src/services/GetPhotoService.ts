import { PrismaClient } from "@prisma/client";

class GetPhotoService {
  private prisma = new PrismaClient();

  async getPatientPhoto(patientId: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
      select: { picture_url: true },
    });

    if (!patient) {
      throw new Error("Patient not found.");
    }

    return patient.picture_url;
  }

  async getDoctorPhoto(doctorId: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
      select: { picture_url: true },
    });

    if (!doctor) {
      throw new Error("Doctor not found.");
    }

    return doctor.picture_url;
  }
}

export { GetPhotoService };