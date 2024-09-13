import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

class CreateAdminService {
  private prisma = new PrismaClient();

  async execute(record: string) {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: {
        record,
      },
    });

    if (existingAdmin) {
      throw new Error("Admin already registered with this record.");
    }

    //const hashedRecord = await bcrypt.hash(record, 10);

    const admin = await this.prisma.admin.create({
      data: {
        record: record,
      },
    });

    return admin;
  }
}

export { CreateAdminService };