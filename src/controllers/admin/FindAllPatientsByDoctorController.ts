import { Request, Response } from "express";
import { FindAllPatientsService } from "../../services/doctor/FindAllPatientsService";

class FindAllPatientsByDoctorController {
  async handle(req: Request, res: Response) {
    const {crm} = req.body;
    const findAllPatientsService = new FindAllPatientsService();

    return res.json(await findAllPatientsService.execute(crm));
  }
}

export { FindAllPatientsByDoctorController };