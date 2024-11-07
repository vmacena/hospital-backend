import { PrismaClient } from "@prisma/client";
import { Address } from "../address/Address";

class CreatePatientService {
  private prisma = new PrismaClient();

  async execute(namePatient: string, email: string, accessLevelId: number, address: Address, picture_url: string) {
    const existingPatient = await this.prisma.patient.findUnique({
      where: {
        email,
      },
    });

    if (existingPatient) {
      throw new Error("Patient already registered with this email.");
    }

    const susNumber = BigInt(Date.now() + Math.floor(Math.random() * 1000));

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

    const patient = await this.prisma.patient.create({
      data: {
        susNumber,
        namePatient,
        email,
        accessLevelId,
        addressId: createdAddress.id,
        picture_url
      },
    });

    return patient;
  }
}

export { CreatePatientService };