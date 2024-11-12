import { Request, Response } from "express";
import { LoginPatientService } from "../../services/patient/LoginPatientService";

class LoginPatientController {
  async handle(req: Request, res: Response) {
    const { susNumber } = req.body;

    const loginPatientService = new LoginPatientService();

    try {
      const { patient, token } = await loginPatientService.execute(BigInt(susNumber));

      const responsePatient = {
        id: patient.id,
        name: patient.name,
        email: patient.email,
        picture_url: patient.picture_url,
        susNumber: patient.susNumber.toString(),
        accessLevel: patient.accessLevel,
      };

      return res.json({ 
        patient: responsePatient, 
        token 
      });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export { LoginPatientController };