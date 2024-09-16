import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class LoginPatientService {
  private prisma = new PrismaClient();
  private secret = process.env.JWT_SECRET as string;

  async execute(susNumber: bigint) {
    const patient = await this.prisma.patient.findUnique({
      where: {
        susNumber,
      },
      include: {
        accessLevel: true,
      },
    });

    if (!patient) {
      throw new Error("Número do SUS não encontrado");
    }

    const token = jwt.sign({ 
        id: patient.id, 
        susNumber: patient.susNumber.toString(),
        accessLevel: patient.accessLevel.level 
      }, 
      this.secret, { expiresIn: "1h", });

    return { patient, token };
  }
}

export { LoginPatientService };