import { PrismaClient } from "@prisma/client";
import { Address } from "../address/Address";

class EditAddressService{
    private prisma = new PrismaClient();

    async execute(addressId: number, address: Address) {

        const updatedAddress = await this.prisma.address.update({
            where: {
                id: addressId
            },
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

        return updatedAddress;
    }

}