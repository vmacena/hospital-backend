import { Request, Response } from "express";
import { CreateDoctorService } from "../../services/doctor/CreateDoctorService";

class CreateDoctorController {
  async handle(req: Request, res: Response) {
    const { nameDoctor, specialty, crm } = req.body;
    const accessLevelId = 2;

    const createDoctorService = new CreateDoctorService();
    const doctor = await createDoctorService.execute(nameDoctor, specialty, crm, accessLevelId);

    return res.json(doctor);
  }
}

export { CreateDoctorController };