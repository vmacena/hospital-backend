import { PrismaClient } from "@prisma/client";

class CreateAdminService {
  private prisma = new PrismaClient();

  async execute(record: string) {
    const admin = await this.prisma.admin.create({
      data: {
        record,
      },
    });

    return admin;
  }
}

export { CreateAdminService };