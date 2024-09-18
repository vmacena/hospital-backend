import { PrismaClient } from "@prisma/client";

class FindDoctorAppointmentsAndExamsService {
  private prisma = new PrismaClient();

  async execute(doctorId: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        appointments: {
          include: {
            patient: {
              select: {
                namePatient: true,
              },
            },
          },
        },
        exams: {
          include: {
            patient: {
              select: {
                namePatient: true,
              },
            },
          },
        },
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found.");
    }

    return {
      appointments: doctor.appointments,
      exams: doctor.exams,
    };
  }
}

export { FindDoctorAppointmentsAndExamsService };