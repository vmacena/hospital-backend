import { Request, Response } from "express";
import { GetAllLogsService } from "../../services/log/GetAllLogsService";

class GetAllLogsController {
  async handle(req: Request, res: Response) {
    const getAllLogsService = new GetAllLogsService();

    try {
      const logs = await getAllLogsService.execute();
      return res.json(logs);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export { GetAllLogsController };