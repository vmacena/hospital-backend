import { Request, Response } from "express";
import { LoginPatientService } from "../../services/patient/LoginPatientService";

class LoginPatientController {
  async handle(req: Request, res: Response) {
    const { susNumber } = req.body;

    const loginPatientService = new LoginPatientService();

    try {
      const { patient, token } = await loginPatientService.execute(BigInt(susNumber));

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