import { PrismaClient } from "@prisma/client";
import { Address } from "../address/Address";

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

    const createdAddress = await this.prisma.address.create({
      data: {
        cep: address.cep,
        street: address.street,
        district: address.district,
        state: address.state,
        city: address.city,
        number: address.number,
        complement: address.complement,
      },
    });

    const admin = await this.prisma.admin.create({
      data: {
        record,
        accessLevelId,
        addressId: createdAddress.id,
      },
    });

    return admin;
  }
}

export { CreateAdminService };