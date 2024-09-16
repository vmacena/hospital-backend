import { Request, Response } from "express";
import { LoginPatientService } from "../services/LoginPatientService";

class LoginPatientController {
  async handle(req: Request, res: Response) {
    const { susNumber } = req.body;

    const loginPatientService = new LoginPatientService();

    try {
      const { patient, token } = await loginPatientService.execute(BigInt(susNumber));

      // Converta o BigInt para string antes de enviar a resposta
      const responsePatient = {
        ...patient,
        susNumber: patient.susNumber.toString(),
      };

      return res.json({ id: responsePatient.id, token, accessLevel: responsePatient.accessLevel.level, susNumber: responsePatient.susNumber });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export { LoginPatientController };