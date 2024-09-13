import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

class LoginAdminService {
  private prisma = new PrismaClient();
  private secret = process.env.JWT_SECRET as string;

  async execute(record: string) {
    const admin = await this.prisma.admin.findFirst({
      where: {},
    });

    if (!admin) {
      throw new Error("Credential not found.");
    }

    //import bcrypt from "bcryptjs";
    {/*const isMatch = await bcrypt.compare(
        record, 
        admin.record);

    if (!isMatch) {
      throw new Error("Invalid credentials.");
    }
    */}

    const token = jwt.sign({ 
        id: admin.id, 
        record: admin.record }, 
        this.secret, { expiresIn: "1h", });

    return { admin, token };
  }
}

export { LoginAdminService };