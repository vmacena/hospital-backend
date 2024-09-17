import { Request, Response } from "express";
import { ScheduleExamService } from "../../services/exam/ScheduleExamService";

class ScheduleExamController {
  async handle(req: Request, res: Response) {
    const { patientId, doctorId, type, date } = req.body;

    const scheduleExamService = new ScheduleExamService();

    try {
      const exam = await scheduleExamService.execute(patientId, doctorId, type, new Date(date));
      return res.json(exam);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { ScheduleExamController };