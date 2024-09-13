import { Request, Response } from "express";
import { LoginAdminService } from "../services/LoginAdminService";

class LoginAdminController {
  async handle(req: Request, res: Response) {
    const { record } = req.body;

    const loginAdminService = new LoginAdminService();

    try {
      const { admin, token } = await loginAdminService.execute(record);
      return res.json({ id: admin.id, token });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export { LoginAdminController };