import { Request, Response } from "express";
import { LoginDoctorService } from "../../services/doctor/LoginDoctorService";

class LoginDoctorController {
  async handle(req: Request, res: Response) {
    const { crm } = req.body;

    const loginDoctorService = new LoginDoctorService();

    try {
      const { doctor, token } = await loginDoctorService.execute(crm);
      return res.json({ id: doctor.id, token, accessLevel: doctor.accessLevel.level, crm: doctor.crm });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export { LoginDoctorController };