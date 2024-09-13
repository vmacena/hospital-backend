import { Request, Response } from "express";
import { CreateAdminService } from "../services/CreateAdminService";

class CreateAdminController {
  async handle(req: Request, res: Response) {
    const { record } = req.body;

    const createAdminService = new CreateAdminService();
    const admin = await createAdminService.execute(record);

    return res.json(admin);
  }
}

export { CreateAdminController };