import { PrismaClient } from "@prisma/client";

class CreateAdminService {
  private prisma = new PrismaClient();

  async execute(record: string) {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: {
        record,
      },
    });

    if (existingAdmin) {
      throw new Error("Admin already registered with this credential.");
    }

    const admin = await this.prisma.admin.create({
      data: {
        record,
      },
    });

    return admin;
  }
}

export { CreateAdminService };