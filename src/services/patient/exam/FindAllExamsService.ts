import { PrismaClient } from "@prisma/client";

export class FindAllExamsService {
  private prisma = new PrismaClient();

  async execute(susNumber: bigint) {
    const exams = await this.prisma.exam.findMany({
      where: {
        patient: {
          susNumber: susNumber,
        }
      },
    });

    return exams;
  }
}