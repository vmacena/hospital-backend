import { Request, Response } from "express";
import { GetPhotoService } from "../../services/GetPhotoService";

class GetDoctorPhotoController {
    async handle(req: Request, res: Response) {
      const { doctorId } = req.params;
      const getPhotoService = new GetPhotoService();
  
      try {
        const photoUrl = await getPhotoService.getDoctorPhoto(Number(doctorId));
        return res.json({ photoUrl });
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
  
  export { GetDoctorPhotoController };