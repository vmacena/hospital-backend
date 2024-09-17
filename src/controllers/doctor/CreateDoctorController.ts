import { Request, Response } from "express";
import { CreateDoctorService } from "../../services/doctor/CreateDoctorService";

class CreateDoctorController {
    async handle(req: Request, res: Response) {
      const { crm, nameDoctor, specialty } = req.body;
  
      const createDoctorService = new CreateDoctorService();
  
      try {
        const doctor = await createDoctorService.execute(crm, nameDoctor, specialty);
        return res.json(doctor);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }
  }

export { CreateDoctorController };