import { Request, Response } from "express";
import { CreateAdminService } from "../services/CreateAdminService";

class CreateAdminController {
  async handle(req: Request, res: Response) {
    const { record } = req.body;
    const accessLevelId = 1; // Definindo o nível de acesso como 1 (Admin)

    const createAdminService = new CreateAdminService();
    const admin = await createAdminService.execute(record, accessLevelId);

    return res.json(admin);
  }
}

export { CreateAdminController };