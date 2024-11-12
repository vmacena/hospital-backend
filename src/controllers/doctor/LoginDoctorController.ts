import { Request, Response } from "express";
import { LoginDoctorService } from "../../services/doctor/LoginDoctorService";

class LoginDoctorController {
  async handle(req: Request, res: Response) {
    const { crm } = req.body;

    const loginDoctorService = new LoginDoctorService();

    try {
      const { doctor, token } = await loginDoctorService.execute(crm);
      return res.json({ 
        id: doctor.id, 
        name: doctor.name, 
        email: doctor.email, 
        picture_url: doctor.picture_url, 
        token, 
        accessLevel: doctor.accessLevel 
      });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export { LoginDoctorController };