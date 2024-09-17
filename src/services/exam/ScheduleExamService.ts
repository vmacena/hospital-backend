import { PrismaClient } from "@prisma/client";

class ScheduleExamService {
  private prisma = new PrismaClient();

  async execute(patientId: number, doctorId: number, type: string, date: Date) {
    const exam = await this.prisma.exam.create({
      data: {
        patientId,
        doctorId,
        type,
        date,
      },
    });

    return exam;
  }
}

export { ScheduleExamService };