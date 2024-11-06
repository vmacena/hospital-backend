import { Request, Response } from "express";
import { CreateAdminService } from "../../services/admin/CreateAdminService";

import { Address } from "../../services/address/Address"; 

interface CreateAdminRequestBody {
  record: string;
  address: Address;
}

class CreateAdminController {
  async handle(req: Request<{}, {}, CreateAdminRequestBody>, res: Response) {
    const { record, address } = req.body;
    const accessLevelId = 1; 

    const createAdminService = new CreateAdminService();
    const admin = await createAdminService.execute(record, accessLevelId, address);

    return res.json(admin);
  }
}

export { CreateAdminController };