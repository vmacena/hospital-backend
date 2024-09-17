import { Request, Response } from "express";
import { CreateAdminService } from "../../services/admin/CreateAdminService";

class CreateAdminController {
  async handle(req: Request, res: Response) {
    const { record } = req.body;
    const accessLevelId = 1; 

    const createAdminService = new CreateAdminService();
    const admin = await createAdminService.execute(record, accessLevelId);

    return res.json(admin);
  }
}

export { CreateAdminController };