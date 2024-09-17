import { PrismaClient } from "@prisma/client";

class CreateLogAccessService {
  private prisma = new PrismaClient();

  async execute(userId: number, userType: string, accessLevel: string) {
    let logData: any = { userType, accessLevel, timestamp: new Date() }; 

    if (userType === "admin") {
      logData.adminId = userId;
    } else if (userType === "doctor") {
      logData.doctorId = userId;
    } else if (userType === "patient") {
      logData.patientId = userId;
    }

    const log = await this.prisma.logAccess.create({
      data: logData,
    });

    return log;
  }
}

export { CreateLogAccessService };