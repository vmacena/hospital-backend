import { Request, Response } from "express";
import { GetPatientDataService } from "../../services/patient/GetPatientDataService";

class GetPatientDataController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getPatientDataService = new GetPatientDataService();

    try {
      const patient = await getPatientDataService.execute(Number(id));

      const responsePatient = {
        ...patient,
        susNumber: patient.susNumber.toString(),
      };

      return res.json(responsePatient);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export { GetPatientDataController };