import { Request, Response } from 'express';
import { EditAddressService } from '../../services/address/EditAddressService';

class EditAddressController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { cep, street, district, state, city, number, complement } = request.body;

        const editAddressService = new EditAddressService();

        try {
            const updatedAddress = await editAddressService.execute(Number(id), {
                cep,
                street,
                district,
                state,
                city,
                number,
                complement
            });

            return response.json(updatedAddress);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }
}

export { EditAddressController };