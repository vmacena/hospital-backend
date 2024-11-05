import { PrismaClient } from "@prisma/client";
import { Address } from "../dto/Address";

class CreateAdminService {
  private prisma = new PrismaClient();

  async execute(record: string, accessLevelId: number, address: Address) {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: {
        record,
      },
    });

    if (existingAdmin) {
      throw new Error("Admin already registered with this record.");
    }

    const admin = await this.prisma.admin.create({
      data: {
        record,
        accessLevelId,
      },
    });

    return admin;
  }
}

export { CreateAdminService };