import { PrismaClient } from "@prisma/client";

export class FindAllAppointmentsService {
  private prisma = new PrismaClient();

  async execute(susNumber: bigint) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        patient: {
          susNumber: susNumber,
        }
      },
    });

    return appointments;
  }
}