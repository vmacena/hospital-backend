import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CreateLogAccessService } from "../log/CreateLogAccessService";

dotenv.config();

class LoginDoctorService {
  private prisma = new PrismaClient();
  private secret = process.env.JWT_SECRET as string;

  async execute(crm: string) {
    console.log(this.secret);
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        crm,
      },
      include: {
        accessLevel: true,
      },
    });

    if (!doctor) {
      throw new Error("Doutor não encontrado.");
    }

    const token = jwt.sign(
      { 
        id: doctor.id, 
        crm: doctor.crm,
        accessLevel: doctor.accessLevel.level 
      }, 
      this.secret, 
      { expiresIn: "1h" }
    );

    const createLogAccessService = new CreateLogAccessService();
    await createLogAccessService.execute(doctor.id, "doctor", doctor.accessLevel.level);

    return { doctor, token };
  }
}

export { LoginDoctorService };