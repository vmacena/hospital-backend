import { Request, Response } from "express";
import { CreateDoctorService } from "../../services/doctor/CreateDoctorService";
import { Address } from "../../services/address/Address"; 

interface CreateDoctorRequestBody {
  crm: string;
  nameDoctor: string;
  specialty: string;
  address: Address;
  picture_url: string;
}

class CreateDoctorController {
  async handle(req: Request<{}, {}, CreateDoctorRequestBody>, res: Response) {
    const { crm, nameDoctor, specialty, address, picture_url } = req.body;

    const createDoctorService = new CreateDoctorService();

    try {
      const doctor = await createDoctorService.execute(crm, nameDoctor, specialty, address, picture_url);
      return res.json(doctor);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { CreateDoctorController };