import { PrismaClient } from "@prisma/client";
import { convertBigIntToString } from "./utils";

class GetAllLogsService {
  private prisma = new PrismaClient();

  async execute() {
    const logs = await this.prisma.logAccess.findMany({
      include: {
        admin: true,
        doctor: true,
        patient: true,
      },
    });

    const serializedLogs = convertBigIntToString(logs);

    return serializedLogs;
  }
}

export { GetAllLogsService };