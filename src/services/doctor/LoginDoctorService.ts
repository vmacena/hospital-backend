import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class LoginDoctorService {
  private prisma = new PrismaClient();
  private secret = process.env.JWT_SECRET as string;

  async execute(crm: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        crm,
      },
      include: {
        accessLevel: true,
      },
    });

    if (!doctor) {
      throw new Error("CRM não encontrado.");
    }

    const token = jwt.sign({ 
        id: doctor.id, 
        crm: doctor.crm,
        accessLevel: doctor.accessLevel.level 
      }, 
      this.secret, { expiresIn: "1h", });

    return { doctor, token };
  }
}

export { LoginDoctorService };