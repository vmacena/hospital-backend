import { PrismaClient } from "@prisma/client";
import { Address } from "../address/Address";

class CreateDoctorService {
  private prisma = new PrismaClient();

  async execute(crm: string, nameDoctor: string, specialty: string, address: Address, picture_url: string) {
    const existingDoctor = await this.prisma.doctor.findUnique({
      where: {
        crm
      },
    });

    if (existingDoctor) {
      throw new Error("Doctor already registered with this crm.");
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
    

    const accessLevelId = 2;

    const doctor = await this.prisma.doctor.create({
      data: {
        crm,
        nameDoctor,
        specialty,
        accessLevelId,
        addressId: createdAddress.id,
        picture_url
      },
    });

    return doctor;
  }
}

export { CreateDoctorService };