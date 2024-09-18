import { Request, Response } from "express";
import { FindDoctorAppointmentsAndExamsService } from "../../services/doctor/FindDoctorAppointmentsAndExamsService";

interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

class FindDoctorAppointmentsAndExamsController {
  async handle(req: CustomRequest, res: Response) {
    const doctorId = req.user?.id;
    if (!doctorId) {
      return res.status(400).json({ error: "Doctor ID not found in token" });
    }

    const service = new FindDoctorAppointmentsAndExamsService();

    try {
      const data = await service.execute(Number(doctorId));
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}

export { FindDoctorAppointmentsAndExamsController };