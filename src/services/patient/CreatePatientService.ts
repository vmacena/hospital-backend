import { PrismaClient } from "@prisma/client";
import { Address } from "../address/Address";

class CreatePatientService {
  private prisma = new PrismaClient();

  async execute(namePatient: string, email: string, address: Address, picture_url: string, accessLevelId: number = 1) {
    const existingPatient = await this.prisma.patient.findUnique({
      where: {
        email,
      },
    });

    if (existingPatient) {
      throw new Error("Patient already registered with this email.");
    }

    const susNumber = BigInt(Date.now() + Math.floor(Math.random() * 1000));

    console.log("Address object:", address);
    console.log("Address fields:", {
      cep: address.cep,
      street: address.street,
      district: address.district,
      state: address.state,
      city: address.city,
      number: address.number,
      complement: address.complement,
    });

    if (!address.cep || !address.street || !address.district || !address.state || !address.city || !address.number) {
      throw new Error("All address fields are required.");
    }

    const createdAddress = await this.prisma.address.create({
      data: {
        cep: address.cep,
        street: address.street,
        district: address.district,
        state: address.state,
        city: address.city,
        number: parseInt(address.number, 10),
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
        picture_url,
      },
    });

    return patient;
  }
}

export { CreatePatientService };