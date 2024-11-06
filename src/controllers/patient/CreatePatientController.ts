import { Request, Response } from "express";
import { CreatePatientService } from "../../services/patient/CreatePatientService";
import { Address } from "../../services/address/Address"; 

interface CreatePatientRequestBody {
  namePatient: string;
  email: string;
  address: Address;
}

class CreatePatientController {
  async handle(req: Request<{}, {}, CreatePatientRequestBody>, res: Response) {
    const { namePatient, email, address } = req.body;
    const accessLevelId = 3;

    const createPatientService = new CreatePatientService();

    try {
      const patient = await createPatientService.execute(namePatient, email, accessLevelId, address);
      const responsePatient = {
        ...patient,
        susNumber: patient.susNumber.toString(),
      };
      return res.json(responsePatient);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { CreatePatientController };