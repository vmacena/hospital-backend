import { Request, Response } from "express";
import { GetPhotoService } from "../../services/GetPhotoService";

class GetPatientPhotoController {
    async handle(req: Request, res: Response) {
      const { patientId } = req.params;
      const getPhotoService = new GetPhotoService();
  
      try {
        const photoUrl = await getPhotoService.getPatientPhoto(Number(patientId));
        return res.json({ photoUrl });
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
  
  export { GetPatientPhotoController };