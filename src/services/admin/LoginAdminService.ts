import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CreateLogAccessService } from "../log/CreateLogAccessService";

dotenv.config();

class LoginAdminService {
  private prisma = new PrismaClient();
  private secret = process.env.JWT_SECRET as string;

  async execute(record: string) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        record,
      },
      include: {
        accessLevel: true,
      },
    });

    if (!admin) {
      throw new Error("Admin não encontrado.");
    }

    const token = jwt.sign(
      { 
        id: admin.id, 
        record: admin.record,
        accessLevel: admin.accessLevel.level 
      }, 
      this.secret, 
      { expiresIn: "1h" }
    );

    const createLogAccessService = new CreateLogAccessService();
    await createLogAccessService.execute(admin.id, "admin", admin.accessLevel.level);

    return { admin, token };
  }
}

export { LoginAdminService };