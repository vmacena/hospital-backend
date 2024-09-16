import { Request, Response } from "express";
import { CreatePatientService } from "../services/CreatePatientService";

class CreatePatientController {
  async handle(req: Request, res: Response) {
    const { namePatient, email } = req.body;
    const accessLevelId = 3;

    const createPatientService = new CreatePatientService();
    const patient = await createPatientService.execute(namePatient, email, accessLevelId);

    // Converta o BigInt para string antes de enviar a resposta
    const responsePatient = {
      ...patient,
      susNumber: patient.susNumber.toString(),
    };

    return res.json(responsePatient);
  }
}

export { CreatePatientController };