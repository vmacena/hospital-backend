import { Request, Response } from "express";
import { GetPatientDataService } from "../../services/patient/GetPatientDataService";

class GetPatientDataController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const getPatientDataService = new GetPatientDataService();

    
      const patient = await getPatientDataService.execute(Number(id));

      const responsePatient = {
        ...patient,
        susNumber: patient.susNumber.toString(),
      };

      return res.json(responsePatient);
    
  }
}

export { GetPatientDataController };